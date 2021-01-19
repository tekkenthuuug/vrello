const { ErrorResponse } = require('../utils/Responses');
const Board = require('../models/Board.model');

const requireBoardAdmin = async (req, res, next) => {
  const { boardId } = req.params;
  const { userId } = req.session;

  try {
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json(new ErrorResponse("Board doesn't exist"));
    }

    if (String(board.creator) !== userId) {
      return res
        .status(401)
        .json(new ErrorResponse('You are not the owner of the board'));
    }

    res.locals.board = board;

    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = requireBoardAdmin;
