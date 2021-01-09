const Board = require('../models/Board.model');
const Column = require('../models/Column.model');
const Card = require('../models/Card.model');

const handleBoardChangeEvent = (io, socket) => async ({ boardId, action }) => {
  const { type, payload } = action;
  let sendToSender = false;

  switch (type) {
    case 'ADD_CARD': {
      const { toColumn, card } = payload;
      sendToSender = true;

      const newCard = new Card({ ...card, columnId: toColumn });

      const column = await Column.findById(toColumn);

      await column.appendCard(newCard._id);

      await newCard.save();

      payload.card = newCard;

      break;
    }
    case 'ADD_COLUMN': {
      const { column } = payload;
      sendToSender = true;

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

      // delete column
      if (targetColumnId === undefined) {
        const column = await Column.findById(columnIdToMove);

        const board = await Board.findById(column.boardId);

        await board.removeColumn(column._id);

        await column.deleteOne();

        break;
      }

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
    case 'RENAME_COLUMN': {
      const { columnId, newColumnName } = payload;

      await Column.updateOne({ _id: columnId }, { name: newColumnName });

      break;
    }
  }

  // send to all users in this room except sender
  socket.broadcast.to(boardId).emit('board-change', action);

  if (sendToSender) {
    console.log('sender');
    // send to sender if needed
    socket.emit('board-change', action);
  }
};

module.exports = handleBoardChangeEvent;
