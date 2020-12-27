const mongoose = require('mongoose');
const normalizeTransform = require('../utils/normalizeTransform');

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

module.exports = mongoose.model('Board', BoardSchema);
