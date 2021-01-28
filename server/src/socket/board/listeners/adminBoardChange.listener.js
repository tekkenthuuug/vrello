const Board = require('../../../models/Board.model');

const handleAdminBoardChangeEvent = socket => async ({ boardId, action }) => {
  const { type, payload } = action;
  const { session } = socket.request;

  let emitToSender = false;

  const board = await Board.findById(boardId);

  if (!board) {
    socket.emit('boardChange', { type: 'DELETE_BOARD' });

    return socket.disconnect();
  }

  const isBoardAdmin = board.hasAdmin(session.userId);

  if (!isBoardAdmin) {
    socket.emit('noAccess', boardId);

    return socket.disconnect();
  }

  switch (type) {
    case 'RENAME': {
      board.name = payload;

      await board.save();

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

module.exports = handleAdminBoardChangeEvent;
