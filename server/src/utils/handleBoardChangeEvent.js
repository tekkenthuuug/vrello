const Board = require('../models/Board.model');
const Column = require('../models/Column.model');
const Card = require('../models/Card.model');

const handleBoardChangeEvent = io => async ({ boardId, action }) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_CARD': {
      const { toColumn, card } = payload;

      const newCard = new Card({ ...card, columnId: toColumn });

      const column = await Column.findById(toColumn);

      await column.appendCard(newCard._id);

      await newCard.save();

      payload.card = newCard;

      break;
    }
    case 'ADD_COLUMN': {
      const { column } = payload;
      const newColumn = new Column({ ...column, boardId });

      const board = await Board.findById(boardId);

      await board.appendColumn(newColumn._id);

      await newColumn.save();

      payload.column = newColumn;

      break;
    }
    case 'MOVE_CARD': {
      const { fromColumn, toColumn, cardId } = payload;

      const card = await Card.findById(cardId);

      const column = await Column.findById(fromColumn);

      await column.removeCard(card._id);

      // no 'to' means delete
      if (toColumn) {
        const column = await Column.findById(toColumn);

        await column.appendCard(card._id);

        await card.updateOne({ columnId: toColumn });
      } else {
        await card.deleteOne();
      }

      break;
    }
    case 'MOVE_COLUMN': {
      const { columnIdToMove, targetColumnId } = payload;

      if (columnIdToMove === targetColumnId) {
        return;
      }

      const board = await Board.findById(boardId);

      await board.moveColumn(columnIdToMove, targetColumnId);

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
    case 'DELETE_BOARD': {
      const board = await Board.findById(boardId);

      await board.deleteOne();

      break;
    }
  }

  // send to users in this room
  io.to(boardId).emit('board-change', action);
};

module.exports = handleBoardChangeEvent;
