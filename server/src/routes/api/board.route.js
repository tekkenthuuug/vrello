const router = require('express').Router();
const Board = require('../../models/Board.model');
const { SuccessResponse, ErrorResponse } = require('../../utils/Responses');

router.post('/board/create', (req, res, next) => {
  const { boardName } = req.body;
  const { userId } = req.session;
});

module.exports = router;
