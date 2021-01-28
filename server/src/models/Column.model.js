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

ColumnSchema.methods.appendCard = function (cardId) {
  this.cards.push(cardId);
};

ColumnSchema.methods.removeCard = async function (cardId) {
  const cardIndex = this.cards.indexOf(cardId);

  this.cards.splice(cardIndex, 1);
};

ColumnSchema.methods.moveCard = async function (cardId, targetTaskId) {
  const { cards } = this;

  const taskToMoveIndex = cards.indexOf(cardId);

  const targetTaskIndex = cards.indexOf(targetTaskId);

  cards.splice(taskToMoveIndex, 1);

  cards.splice(targetTaskIndex + 1, 0, cardId);
};

ColumnSchema.pre(/delete/i, { document: true }, async function (next) {
  await Card.deleteMany({ _id: { $in: this.cards } });

  next();
});

module.exports = mongoose.model('Column', ColumnSchema);
