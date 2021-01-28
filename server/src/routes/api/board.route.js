const router = require('express').Router();
const Board = require('../../models/Board.model');
const User = require('../../models/User.model');
const BoardRequest = require('../../models/BoardRequest.model');
const ErrorResponse = require('../../utils/ErrorResponse');
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

    await User.updateOne(
      { _id: userId },
      { $push: { boardsOwned: board._id } }
    );

    await board.save();

    return res.json({
      board: { slug: board.slug, creator },
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/delete-or-leave', async (req, res, next) => {
  const { userId } = req.session;
  const ids = Array.isArray(req.body.ids) ? req.body.ids : [req.body.ids];

  try {
    // find owned boards
    const boards = await Board.find({
      creator: userId,
      _id: { $in: ids },
    });

    // remove from member boards
    await Board.updateMany(
      {
        _id: { $in: ids },
        members: userId,
      },
      { $pull: { members: userId } }
    );

    // delete member boards
    boards.forEach(board => board.deleteOne());

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/:boardId/add-member',
  requireBoardAdmin,
  async (req, res, next) => {
    const { userId } = req.body;
    const { board } = res.locals;

    try {
      if (board.hasMember(userId)) {
        return next(new ErrorResponse('User is already a member', 400));
      }

      board.addMember(userId);

      await board.save();

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

    const boardRequest = new BoardRequest({ board: board._id, sender: userId });

    board.requests.push(boardRequest._id);

    await boardRequest.save();

    await board.save();

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
  requireBoardAdmin,
  async (req, res, next) => {
    const { board } = res.locals;
    const { userId } = req.params;

    try {
      board.deleteMember(userId);

      await board.save();

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
