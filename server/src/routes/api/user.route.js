const router = require('express').Router();
const Board = require('../../models/Board.model');
const User = require('../../models/User.model');
const BoardMember = require('../../models/BoardMember.model');
const { SuccessResponse, ErrorResponse } = require('../../utils/Responses');

router.get('/:uid/boards', async (req, res, next) => {
  const { uid } = req.params;

  try {
    const boards = await Board.find({ creatorId: uid }).exec();

    const userToBoardRels = await BoardMember.find({ member: uid }).populate({
      path: 'board',
    });

    const memberBoards = userToBoardRels.map(rel =>
      rel.board.toJSONWithoutColumns()
    );

    return res.json(
      new SuccessResponse({
        boards: boards.map(board => board.toJSONWithoutColumns()),
        memberBoards,
      })
    );
  } catch (error) {
    next(error);
  }
});

router.get('/search', async (req, res, next) => {
  const { email } = req.query;
  const { userId } = req.session;
  try {
    const users = await User.find({
      email: new RegExp(email, 'i'),
      _id: { $ne: userId },
    }).limit(5);

    return res.json(
      new SuccessResponse({
        users,
      })
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
