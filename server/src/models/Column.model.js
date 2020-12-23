const mongoose = require('mongoose');
const insertIntoArray = require('../utils/insertIntoArray');
const normalizeTransform = require('../utils/normalizeTransform');

const Board = require('./Board.model');

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

ColumnSchema.methods.appendToBoard = async function (boardId) {
  await Board.updateOne({ _id: boardId }, { $push: { data: this._id } }).exec();
};

ColumnSchema.methods.moveToColumn = async function (boardId, columnId) {
  const { data } = await Board.findById(boardId).exec();

  let columnToMoveIndex = data.indexOf(this._id);

  let targetColumnIndex = data.indexOf(columnId);

  const newData = insertIntoArray(
    data,
    data.splice(columnToMoveIndex, 1)[0],
    targetColumnIndex
  );

  await Board.updateOne({ _id: boardId }, { $set: { data: newData } }).exec();
};

module.exports = mongoose.model('Column', ColumnSchema);
