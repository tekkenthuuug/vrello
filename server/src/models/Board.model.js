const mongoose = require('mongoose');
const normalizeTransform = require('../utils/normalizeTransform');

const BoardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    columns: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Column',
      },
    ],
  },
  {
    toJSON: {
      transform: normalizeTransform,
    },
  }
);

module.exports = mongoose.model('Board', BoardSchema);
