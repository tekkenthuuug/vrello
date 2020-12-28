const Card = require('../models/Card.model');
const Column = require('../models/Column.model');
const Board = require('../models/Board.model');

const handleBoardChangeEvent = io => async ({ boardId, action }) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_CARD': {
      const { toColumn, card } = payload;

      const newCard = new Card(card);

      await newCard.save();

      await newCard.appendToColumn(toColumn);

      payload.card = newCard;

      break;
    }
    case 'ADD_COLUMN': {
      const { column } = payload;
      const newColumn = new Column(column);

      await newColumn.save();

      await newColumn.appendToBoard(boardId);

      payload.column = newColumn;

      break;
    }
    case 'MOVE_CARD': {
      const { fromColumn, toColumn, cardId } = payload;

      const card = await Card.findById(cardId);

      await card.removeFromColumn(fromColumn);

      // no 'to' means delete
      if (toColumn) {
        await card.appendToColumn(toColumn);
      } else {
        await Card.findByIdAndDelete(cardId).exec();
      }

      break;
    }
    case 'MOVE_COLUMN': {
      const { columnIdToMove, targetColumnId } = payload;

      if (columnIdToMove === targetColumnId) {
        return;
      }

      const columnToMove = await Column.findById(columnIdToMove);

      await columnToMove.moveToColumn(boardId, targetColumnId);

      break;
    }
    case 'RENAME': {
      await Board.updateOne({ _id: boardId }, { name: payload });

      break;
    }
    case 'CHANGE_BG': {
      await Board.updateOne({ _id: boardId }, { backgroundColor: payload });

      break;
    }
  }

  // send to users in this room
  io.to(boardId).emit('board-change', action);
};

module.exports = handleBoardChangeEvent;
