const mongoose = require('mongoose');
const normalizeTransform = require('../utils/normalizeTransform');
const Column = require('./Column.model');

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

ItemSchema.methods.appendToColumn = async function (columnId) {
  await Column.updateOne(
    { _id: columnId },
    { $push: { items: this._id } }
  ).exec();
};

ItemSchema.methods.removeFromColumn = async function (columnId) {
  await Column.updateOne(
    { _id: columnId },
    { $pull: { items: this._id } }
  ).exec();
};

module.exports = mongoose.model('Item', ItemSchema);
