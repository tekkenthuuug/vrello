const mongoose = require('mongoose');
const insertIntoArray = require('../utils/insertIntoArray');
const normalizeTransform = require('../utils/normalizeTransform');
const Column = require('./Column.model');
const BoardMember = require('./BoardMember.model');
const slugify = require('../utils/slugify');

const BoardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Required'],
    },
    slug: {
      type: String,
      required: true,
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
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BoardMember',
      },
    ],
    creator: {
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

BoardSchema.methods.generateSlug = function () {
  this.slug = slugify(this.name);
};

BoardSchema.methods.appendColumn = async function (columnId) {
  await this.updateOne({ $push: { columns: columnId } });
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

  await this.updateOne({ $set: { columns: newColumns } });
};

BoardSchema.methods.removeColumn = async function (columnId) {
  this.updateOne({ $pull: { columns: columnId } });
};

BoardSchema.methods.addMember = async function (userId) {
  await this.updateOne({ $push: { members: userId } });

  const boardMember = new BoardMember({ board: this._id, member: userId });

  await boardMember.save();
};

// ???
BoardSchema.methods.updateName = async function (boardId, name) {
  await Board.updateOne({ _id: boardId }, { name, slug: slugify(name) });
};

BoardSchema.pre(/delete/i, async function (next) {
  await Column.deleteMany({ boardId: this._id });

  await BoardMember.deleteMany({ board: this._id });

  next();
});

BoardSchema.pre('validate', { document: true }, function (next) {
  this.generateSlug();

  next();
});

module.exports = mongoose.model('Board', BoardSchema);
