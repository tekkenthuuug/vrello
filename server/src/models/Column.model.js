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
    cards: [
      {
        default: [],
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
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
  await Board.updateOne(
    { _id: boardId },
    { $push: { columns: this._id } }
  ).exec();
};

ColumnSchema.methods.moveToColumn = async function (boardId, columnId) {
  const { columns } = await Board.findById(boardId).exec();

  let columnToMoveIndex = columns.indexOf(this._id);

  let targetColumnIndex = columns.indexOf(columnId);

  const newColumns = insertIntoArray(
    columns,
    columns.splice(columnToMoveIndex, 1)[0],
    targetColumnIndex
  );

  await Board.updateOne(
    { _id: boardId },
    { $set: { columns: newColumns } }
  ).exec();
};

module.exports = mongoose.model('Column', ColumnSchema);
