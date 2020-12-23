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

      await newItem.appendToColumn(to);

      payload.item = newItem;

      break;
    }
    case 'ADD_COLUMN': {
      const { column } = payload;
      const newColumn = new Column(column);

      await newColumn.save();

      await newColumn.appendToBoard(boardId);

      payload.column = newColumn;

      break;
    }
    case 'MOVE_CARD': {
      const { from, to, itemId } = payload;

      const item = await Item.findById(itemId);

      await item.removeFromColumn(from);

      // no 'to' means delete
      if (to) {
        await item.appendToColumn(to);
      } else {
        await Item.findByIdAndDelete(itemId).exec();
      }

      break;
    }
    case 'MOVE_COLUMN': {
      const { columnId, targetColumnId } = payload;

      if (columnId === targetColumnId) {
        return;
      }

      const columnToMove = await Column.findById(columnId);

      await columnToMove.moveToColumn(boardId, targetColumnId);

      break;
    }
  }

  // send to users in this room
  io.to(boardId).emit('board-change', action);
};

module.exports = handleBoardChangeEvent;
