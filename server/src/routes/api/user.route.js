const router = require('express').Router();
const Board = require('../../models/Board.model');
const { SuccessResponse, ErrorResponse } = require('../../utils/Responses');

router.get('/:uid/boards', (req, res, next) => {
  const { uid } = req.params;
});

module.exports = router;