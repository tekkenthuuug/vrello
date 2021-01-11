const mongoose = require('mongoose');
const normalizeTransform = require('../utils/normalizeTransform');

const BoardMemberSchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    toJSON: {
      transform: normalizeTransform,
    },
  }
);

module.exports = mongoose.model('BoardMember', BoardMemberSchema);
