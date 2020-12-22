const mongoose = require('mongoose');
const normalizeTransform = require('../utils/normalizeTransform');

const ColumnSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    items: [
      {
        default: [],
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
      },
    ],
  },
  {
    toJSON: {
      transform: normalizeTransform,
    },
  }
);

module.exports = mongoose.model('Column', ColumnSchema);
