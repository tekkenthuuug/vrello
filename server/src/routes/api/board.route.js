const router = require('express').Router();
const Board = require('../../models/Board.model');
const User = require('../../models/User.model');
const BoardMember = require('../../models/BoardMember.model');
const { SuccessResponse, ErrorResponse } = require('../../utils/Responses');

router.post('/create', async (req, res, next) => {
  const { name, backgroundColor } = req.body;
  const { userId } = req.session;

  try {
    const creator = await User.findById(userId).select({ slug: 1 });

    const board = new Board({
      name,
      backgroundColor,
      creator: userId,
    });

    await board.save();

    return res.json(
      new SuccessResponse({
        board: { slug: board.slug, creator },
      })
    );
  } catch (error) {
    next(error);
  }
});

router.post('/:boardId/add-member', async (req, res, next) => {
  const { boardId } = req.params;
  const { userId } = req.session;
  const { userId: userIdToAdd } = req.body;

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

    const conflictingBoardMembership = await BoardMember.findOne({
      board: boardId,
      member: userIdToAdd,
    });

    if (conflictingBoardMembership) {
      return res
        .status(400)
        .json(new ErrorResponse('User is already a member'));
    }

    await board.addMember(userIdToAdd);

    return res.json(new SuccessResponse());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
