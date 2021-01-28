const mongoose = require('mongoose');
const normalizeTransform = require('../utils/normalizeTransform');
const Column = require('./Column.model');
const User = require('./User.model');
const slugify = require('../utils/slugify');
const uniqueValidator = require('mongoose-unique-validator');

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
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform: normalizeTransform,
    },
  }
);

BoardSchema.index({ creator: 1, name: 1 }, { unique: true });

BoardSchema.plugin(uniqueValidator, { message: 'Already exists' });

BoardSchema.path('name').set(function (newName) {
  if (this.isNew || newName !== this.name) {
    this.slug = slugify(newName);
  }

  return newName;
});

BoardSchema.methods.appendColumn = function (columnId) {
  this.columns.push(columnId);
};

BoardSchema.methods.removeColumn = function (columnId) {
  const columnIndex = this.columns.indexOf(columnId);
  this.columns.splice(columnIndex, 1);
};

BoardSchema.methods.moveColumn = function (columnIdToMove, targetColumnId) {
  const { columns } = this;

  const columnToMoveIndex = columns.indexOf(columnIdToMove);

  const targetColumnIndex = columns.indexOf(targetColumnId);

  columns.splice(columnToMoveIndex, 1);

  columns.splice(targetColumnIndex, 0, columnIdToMove);
};

BoardSchema.methods.addMember = function (userId) {
  this.members.push(userId);
};

BoardSchema.methods.deleteMember = function (userId) {
  const memberIndex = this.members.indexOf(userId);

  this.members.splice(memberIndex, 1);
};

BoardSchema.methods.hasMember = function (userId) {
  return this.members.includes(userId);
};

BoardSchema.methods.hasAdmin = function (userId) {
  return String(this.creator) === userId;
};

BoardSchema.methods.populateFullBoard = async function () {
  return await this.populate({
    path: 'columns',
    populate: {
      path: 'cards',
    },
  }).execPopulate();
};

BoardSchema.pre(/delete/i, { document: true }, async function (next) {
  const columns = await Column.find({ boardId: this._id });
  columns.forEach(col => col.deleteOne());

  await User.updateOne(
    { _id: this.creator },
    { $pull: { boardsOwned: this._id } }
  );

  next();
});

module.exports = mongoose.model('Board', BoardSchema);
