const mongoose = require('mongoose');
const normalizeTransform = require('../utils/normalizeTransform');

const BoardRequestSchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    toJSON: {
      transform: normalizeTransform,
    },
    timestamps: true,
  }
);

module.exports = mongoose.model('BoardRequest', BoardRequestSchema);
