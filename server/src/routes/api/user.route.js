const router = require('express').Router();
const Board = require('../../models/Board.model');
const User = require('../../models/User.model');
const BoardMember = require('../../models/BoardMember.model');
const { SuccessResponse, ErrorResponse } = require('../../utils/Responses');

router.get('/:uid/boards', async (req, res, next) => {
  const { uid } = req.params;

  try {
    const boards = await Board.find({ creator: uid }, '-members -columns');

    const boardMemberships = await BoardMember.find({ member: uid }).populate({
      path: 'board',
      select: '-members -columns',
      populate: {
        path: 'creator',
        select: 'slug -_id',
      },
    });

    return res.json(
      new SuccessResponse({
        boards,
        memberBoards: boardMemberships.map(rel => rel.board),
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
    const filter = { email: new RegExp(email, 'i') };

    // if user authenticated exclude him from search
    if (userId) {
      filter._id = { $ne: userId };
    }

    const users = await User.find(filter).limit(5);

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
