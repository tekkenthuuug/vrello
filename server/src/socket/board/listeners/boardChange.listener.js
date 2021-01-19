const Board = require('../../../models/Board.model');
const Column = require('../../../models/Column.model');
const Card = require('../../../models/Card.model');

const handleBoardChangeEvent = socket => async ({ boardId, action }) => {
  const { type, payload } = action;
  const { session } = socket.request;

  let emitToSender = false;

  const board = await Board.findById(boardId);

  await board.updateOne({ updatedAt: Date.now() });

  const isBoardAdmin = session.userId === String(board.creator);

  let matchedMemberAction = true;

  // all member actions
  switch (type) {
    case 'ADD_CARD': {
      const { toColumn, card } = payload;
      emitToSender = true;

      const newCard = new Card({ ...card, columnId: toColumn });

      const column = await Column.findById(toColumn);

      await column.appendCard(newCard._id);

      await newCard.save();

      payload.card = newCard;

      break;
    }
    case 'ADD_COLUMN': {
      const { column } = payload;
      emitToSender = true;

      const newColumn = new Column({ ...column, boardId });

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

        await board.removeColumn(column._id);

        await column.deleteOne();

        break;
      }

      if (columnIdToMove === targetColumnId) {
        return;
      }

      await board.moveColumn(columnIdToMove, targetColumnId);

      break;
    }
    case 'RENAME_COLUMN': {
      const { columnId, newColumnName } = payload;

      await Column.updateOne({ _id: columnId }, { name: newColumnName });

      break;
    }
    default: {
      matchedMemberAction = false;
    }
  }

  // admin actions
  if (!matchedMemberAction && isBoardAdmin) {
    switch (type) {
      case 'RENAME': {
        await board.updateName(payload);

        break;
      }
      case 'CHANGE_BG': {
        await board.updateOne({ backgroundColor: payload });

        break;
      }
      case 'DELETE_BOARD': {
        await board.deleteOne();

        break;
      }
    }
  } else {
    // user is not allowed to use this action or sends wrong action
    socket.disconnect();
    return;
  }

  // send to all users in this room except sender
  socket.broadcast.to(boardId).emit('boardChange', action);

  if (emitToSender) {
    // send to sender if needed
    socket.emit('boardChange', action);
  }
};

module.exports = handleBoardChangeEvent;
