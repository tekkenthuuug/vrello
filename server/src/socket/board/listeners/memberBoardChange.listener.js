const Board = require('../../../models/Board.model');
const Column = require('../../../models/Column.model');
const Card = require('../../../models/Card.model');

const handleMemberBoardChangeEvent = socket => async ({ boardId, action }) => {
  const { type, payload } = action;
  const { session } = socket.request;

  let emitToSender = false;

  const board = await Board.findById(boardId);

  if (!board) {
    socket.emit('boardChange', { type: 'DELETE_BOARD' });

    return socket.disconnect();
  }

  const hasAccess =
    board.hasMember(session.userId) || board.hasAdmin(session.userId);

  if (!hasAccess) {
    socket.emit('noAccess', boardId);

    return socket.disconnect();
  }

  switch (type) {
    case 'ADD_CARD': {
      const { toColumnId, card } = payload;
      emitToSender = true;

      const newCard = new Card({ ...card, columnId: toColumnId });

      const column = await Column.findById(toColumnId);

      column.appendCard(newCard._id);

      await column.save();
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
      await board.save();

      payload.column = newColumn;

      break;
    }
    case 'MOVE_CARD': {
      const { fromColumnId, toColumnId, cardId, targetCardId } = payload;

      const card = await Card.findById(cardId);
      const fromColumn = await Column.findById(fromColumnId);

      // no 'to' means delete
      if (!toColumnId) {
        fromColumn.removeCard(card._id);
        fromColumn.save();
        await card.deleteOne();
        break;
      }

      const toColumn = await Column.findById(toColumnId);

      if (toColumnId !== fromColumnId) {
        fromColumn.removeCard(card._id);
        toColumn.appendCard(card._id);

        await fromColumn.save();
        await card.updateOne({ columnId: toColumnId });
      }

      if (targetCardId) {
        toColumn.moveCard(cardId, targetCardId);
      }

      await toColumn.save();

      break;
    }
    case 'MOVE_COLUMN': {
      const { columnIdToMove, targetColumnId } = payload;

      if (columnIdToMove === targetColumnId) {
        return;
      }

      // delete column
      if (targetColumnId === undefined) {
        const column = await Column.findById(columnIdToMove);

        board.removeColumn(column._id);

        await column.deleteOne();
        await board.save();

        break;
      }

      board.moveColumn(columnIdToMove, targetColumnId);
      await board.save();

      break;
    }
    case 'RENAME_COLUMN': {
      const { columnId, newColumnName } = payload;

      await Column.updateOne({ _id: columnId }, { name: newColumnName });

      break;
    }
    default: {
      socket.disconnect();
      return;
    }
  }

  await board.updateOne({ updatedAt: Date.now() });

  // send to all users in this room except sender
  socket.broadcast.to(boardId).emit('boardChange', action);

  if (emitToSender) {
    // send to sender if needed
    socket.emit('boardChange', action);
  }
};

module.exports = handleMemberBoardChangeEvent;
