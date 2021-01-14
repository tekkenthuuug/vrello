const mongoose = require('mongoose');
const normalizeTransform = require('../utils/normalizeTransform');
const Card = require('./Card.model');

const ColumnSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
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

ColumnSchema.methods.appendCard = async function (cardId) {
  await this.updateOne({ $push: { cards: cardId } });
};

ColumnSchema.methods.removeCard = async function (cardId) {
  await this.updateOne({ $pull: { cards: cardId } });
};

ColumnSchema.pre(/delete/i, async function (next) {
  await Card.deleteMany({ _id: { $in: this.cards } });

  next();
});

module.exports = mongoose.model('Column', ColumnSchema);
