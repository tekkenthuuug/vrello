const router = require('express').Router();
const Board = require('../../models/Board.model');
const { SuccessResponse, ErrorResponse } = require('../../utils/Responses');

router.get('/:uid/boards', async (req, res, next) => {
  const { uid } = req.params;

  const boards = await Board.find({ creatorId: uid }).exec();

  return res.json(
    new SuccessResponse({
      boards: boards.map(board => board.toJSONWithoutColumns()),
    })
  );
});

module.exports = router;
