const Item = require('../models/Item.model');
const Column = require('../models/Column.model');
const Board = require('../models/Board.model');

const insertIntoArray = require('./insertIntoArray');

const handleBoardChangeEvent = io => async ({ boardId, action }) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_CARD': {
      const { to, item } = payload;

      const newItem = new Item(item);

      await newItem.save();

      await Column.updateOne(
        { _id: to },
        { $push: { items: newItem._id } }
      ).exec();

      payload.item = newItem;

      break;
    }
    case 'ADD_COLUMN': {
      const { column } = payload;
      const newColumn = new Column(column);

      await newColumn.save();

      await Board.updateOne(
        { _id: boardId },
        { $push: { data: newColumn._id } }
      ).exec();

      payload.column = newColumn;

      break;
    }
    case 'MOVE_CARD': {
      const { from, to, itemId } = payload;

      await Column.updateOne(
        { _id: from },
        { $pull: { items: itemId } }
      ).exec();

      // no 'to' means delete
      if (to) {
        await Column.updateOne(
          { _id: to },
          { $push: { items: itemId } }
        ).exec();
      }

      break;
    }
    case 'MOVE_COLUMN': {
      const { columnId, targetColumnId } = payload;

      const { data } = await Board.findOne({ _id: boardId }).exec();

      let columnToMoveIndex = data.indexOf(columnId);

      let targetColumnIndex = data.indexOf(targetColumnId);

      if (targetColumnIndex === columnToMoveIndex) {
        return;
      }

      const newData = insertIntoArray(
        data,
        data.splice(columnToMoveIndex, 1)[0],
        targetColumnIndex
      );

      await Board.updateOne(
        { _id: boardId },
        { $set: { data: newData } }
      ).exec();

      break;
    }
  }

  // send to users in this room
  io.to(boardId).emit('board-change', action);
};

module.exports = handleBoardChangeEvent;
