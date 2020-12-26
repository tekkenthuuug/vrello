const router = require('express').Router();
const Board = require('../../models/Board.model');
const { SuccessResponse } = require('../../utils/Responses');

router.post('/create', async (req, res, next) => {
  const { name } = req.body;
  const { userId } = req.session;

  try {
    const board = new Board({ name, creatorId: userId });

    await board.save();

    res.json(new SuccessResponse({ board }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
