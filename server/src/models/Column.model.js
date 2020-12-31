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
  await this.updateOne({ $push: { cards: cardId } }).exec();
};

ColumnSchema.methods.removeCard = async function (cardId) {
  await this.updateOne({ $pull: { cards: cardId } }).exec();
};

ColumnSchema.pre('deleteOne', { document: true }, async function (next) {
  const cards = await Card.find({ columnId: this._id });

  for (const card of cards) {
    await card.deleteOne();
  }

  next();
});

module.exports = mongoose.model('Column', ColumnSchema);
