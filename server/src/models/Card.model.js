const mongoose = require('mongoose');
const normalizeTransform = require('../utils/normalizeTransform');
const Column = require('./Column.model');

const CardSchema = new mongoose.Schema(
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

CardSchema.methods.appendToColumn = async function (columnId) {
  await Column.updateOne(
    { _id: columnId },
    { $push: { cards: this._id } }
  ).exec();
};

CardSchema.methods.removeFromColumn = async function (columnId) {
  await Column.updateOne(
    { _id: columnId },
    { $pull: { cards: this._id } }
  ).exec();
};

module.exports = mongoose.model('Card', CardSchema);
