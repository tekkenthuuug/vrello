const router = require('express').Router();
const Board = require('../../models/Board.model');
const User = require('../../models/User.model');
const BoardMember = require('../../models/BoardMember.model');
const BoardRequest = require('../../models/BoardRequest.model');
const ErrorResponse = require('../../utils/ErrorResponse');
const requireBoardAdmin = require('../../middleware/requireBoardAdmin');
const requireBoardMember = require('../../middleware/requireBoardMember');

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

    return res.json({
      board: { slug: board.slug, creator },
    });
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
        return next(new ErrorResponse('User is already a member', 400));
      }

      await board.addMember(userIdToAdd);

      return res.sendStatus(200);
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
      return next(new ErrorResponse("Board doesn't exist", 404));
    }

    if (String(board.creator) === userId) {
      return next(new ErrorResponse('You are the owner of the board', 400));
    }

    const existingBoardRequest = await BoardRequest.findOne({
      board: boardId,
      sender: userId,
    });

    if (existingBoardRequest) {
      return res.sendStatus(200);
    }

    await board.addRequest(userId);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.get('/:boardId/members', requireBoardAdmin, async (req, res, next) => {
  const { board } = res.locals;

  try {
    const { members } = await board
      .populate({
        path: 'members',
        select: 'id username email shortUsername',
      })
      .execPopulate();

    return res.json({ members });
  } catch (error) {
    next(error);
  }
});

router.delete(
  '/:boardId/members/:userId',
  requireBoardMember,
  async (req, res, next) => {
    const { board } = res.locals;
    const { userId } = req.params;

    try {
      await board.deleteMember(userId);

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
