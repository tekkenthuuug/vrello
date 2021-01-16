const mongoose = require('mongoose');
const insertIntoArray = require('../utils/insertIntoArray');
const normalizeTransform = require('../utils/normalizeTransform');
const Column = require('./Column.model');
const BoardMember = require('./BoardMember.model');
const BoardRequest = require('./BoardRequest.model');
const User = require('./User.model');
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
        ref: 'User',
      },
    ],
    requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BoardRequest',
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
    timestamps: true,
  }
);

// TODO: index probably not working as expected
BoardSchema.index({ creator: 1, slug: 1 }, { unique: true });

BoardSchema.methods.updateSlug = function () {
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

BoardSchema.methods.addRequest = async function (userId) {
  const boardRequest = new BoardRequest({ board: this._id, sender: userId });

  await this.updateOne({ $push: { requests: boardRequest._id } });

  await boardRequest.save();
};

BoardSchema.methods.populateData = async function () {
  return await this.populate({
    path: 'columns',
    populate: {
      path: 'cards',
    },
  }).execPopulate();
};

BoardSchema.methods.updateName = async function (name) {
  await this.updateOne({ name, slug: slugify(name) });
};

BoardSchema.pre(/delete/i, { document: true }, async function (next) {
  await Column.deleteMany({ boardId: this._id });

  await BoardMember.deleteMany({ board: this._id });

  await User.updateOne(
    { _id: this.creator },
    { $pull: { boardsOwned: this._id } }
  );

  next();
});

BoardSchema.pre(/save/i, { document: true }, async function (next) {
  await User.updateOne(
    { _id: this.creator },
    { $push: { boardsOwned: this._id } }
  );

  next();
});

BoardSchema.pre('validate', { document: true }, function (next) {
  this.updateSlug();

  next();
});

module.exports = mongoose.model('Board', BoardSchema);
