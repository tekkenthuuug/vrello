const mongoose = require('mongoose');
const insertIntoArray = require('../utils/insertIntoArray');
const normalizeTransform = require('../utils/normalizeTransform');
const Column = require('./Column.model');

const BoardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Required'],
    },
    backgroundColor: {
      type: String,
      default: '#0079BF',
    },
    columns: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Column',
      },
    ],
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: {
      transform: normalizeTransform,
    },
  }
);

BoardSchema.methods.toJSONWithoutColumns = function () {
  const { columns, __v, ...otherBoardProperties } = this._doc;

  return {
    ...otherBoardProperties,
    id: otherBoardProperties._id,
  };
};

BoardSchema.methods.appendColumn = async function (columnId) {
  await this.updateOne({ $push: { columns: columnId } }).exec();
};

BoardSchema.methods.moveColumn = async function (
  columnIdToMove,
  targetColumnId
) {
  const { columns } = this;

  let columnToMoveIndex = columns.indexOf(columnIdToMove);

  let targetColumnIndex = columns.indexOf(targetColumnId);

  const newColumns = insertIntoArray(
    columns,
    columns.splice(columnToMoveIndex, 1)[0],
    targetColumnIndex
  );

  await this.updateOne({ $set: { columns: newColumns } }).exec();
};

BoardSchema.pre('deleteOne', { document: true }, async function (next) {
  const columns = await Column.find({ boardId: this._id });

  for (const column of columns) {
    await column.deleteOne();
  }

  next();
});

module.exports = mongoose.model('Board', BoardSchema);
