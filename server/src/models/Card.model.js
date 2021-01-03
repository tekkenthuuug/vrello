const mongoose = require('mongoose');
const normalizeTransform = require('../utils/normalizeTransform');

const CardSchema = new mongoose.Schema(
  {
    columnId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Column',
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: normalizeTransform,
    },
  }
);

module.exports = mongoose.model('Card', CardSchema);
