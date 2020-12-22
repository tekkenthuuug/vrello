const mongoose = require('mongoose');
const normalizeTransform = require('../utils/normalizeTransform');

const ItemSchema = new mongoose.Schema(
  {
    description: {
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

module.exports = mongoose.model('Item', ItemSchema);
