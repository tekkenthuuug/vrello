const router = require('express').Router();
const Board = require('../../models/Board.model');
const User = require('../../models/User.model');
const BoardMember = require('../../models/BoardMember.model');
const BoardRequest = require('../../models/BoardRequest.model');
const { SuccessResponse, ErrorResponse } = require('../../utils/Responses');
const requireBoardAdmin = require('../../middleware/requireBoardAdmin');

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

router.post(
  '/:boardId/add-member',
  requireBoardAdmin,
  async (req, res, next) => {
    const { userId: userIdToAdd } = req.body;
    const { board } = res.locals;

    try {
      const conflictingBoardMembership = await BoardMember.findOne({
        board: board._id,
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
  }
);

router.post('/:boardId/request-access', async (req, res, next) => {
  const { boardId } = req.params;
  const { userId } = req.session;

  try {
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json(new ErrorResponse("Board doesn't exist"));
    }

    if (String(board.creator) === userId) {
      return res
        .status(401)
        .json(new ErrorResponse('You are the owner of the board'));
    }

    const conflictingBoardRequest = await BoardRequest.findOne({
      board: boardId,
      sender: userId,
    });

    if (conflictingBoardRequest) {
      return res.json(new SuccessResponse());
    }

    await board.addRequest(userId);

    return res.json(new SuccessResponse());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
