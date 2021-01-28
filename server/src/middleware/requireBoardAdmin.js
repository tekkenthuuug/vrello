const ErrorResponse = require('../utils/ErrorResponse');
const Board = require('../models/Board.model');

const requireBoardAdmin = async (req, res, next) => {
  const { boardId } = req.params;
  const { userId } = req.session;

  try {
    const board = await Board.findById(boardId);

    if (!board) {
      return next(new ErrorResponse("Board doesn't exist", 404));
    }

    if (!board.hasAdmin(userId)) {
      return next(new ErrorResponse('You are not the owner of the board', 400));
    }

    res.locals.board = board;

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = requireBoardAdmin;
