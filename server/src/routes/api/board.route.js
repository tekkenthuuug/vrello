const router = require('express').Router();
const Board = require('../../models/Board.model');
const BoardMember = require('../../models/BoardMember.model');
const { SuccessResponse, ErrorResponse } = require('../../utils/Responses');

router.post('/create', async (req, res, next) => {
  const { name, backgroundColor } = req.body;
  const { userId } = req.session;

  try {
    const board = new Board({ name, backgroundColor, creatorId: userId });

    await board.save();

    return res.json(new SuccessResponse({ board }));
  } catch (error) {
    next(error);
  }
});

router.post('/:boardId/add-member', async (req, res, next) => {
  const { boardId } = req.params;
  const { userId } = req.session;
  const { userId: userIdToAdd } = req.body;

  try {
    const board = await Board.findById(boardId).exec();

    if (!board) {
      return res.status(404).json(new ErrorResponse("Board doesn't exist"));
    }

    if (String(board.creatorId) !== userId) {
      return res
        .status(401)
        .json(new ErrorResponse('You are not the owner of the board'));
    }

    const conflictingUserToBoardRel = await BoardMember.findOne({
      board: boardId,
      member: userIdToAdd,
    });

    if (conflictingUserToBoardRel) {
      return res
        .status(400)
        .json(new ErrorResponse('User is already a member'));
    }

    await board.addMember(userIdToAdd);

    return res.json(new SuccessResponse(undefined));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
