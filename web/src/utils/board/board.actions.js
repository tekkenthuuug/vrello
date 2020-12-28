import BoardActionTypes from './board.types';

export const initializeBoard = boardData => ({
  type: BoardActionTypes.INIT,
  payload: boardData,
});

export const addCard = (toColumn, card) => ({
  type: BoardActionTypes.ADD_CARD,
  payload: {
    toColumn,
    card,
  },
});

export const moveCard = (fromColumn, toColumn, cardId) => ({
  type: BoardActionTypes.MOVE_CARD,
  payload: {
    fromColumn,
    toColumn,
    cardId,
  },
});

export const addColumn = columnData => ({
  type: BoardActionTypes.ADD_COLUMN,
  payload: { column: columnData },
});

export const moveColumn = (columnIdToMove, targetColumnId) => ({
  type: BoardActionTypes.MOVE_COLUMN,
  payload: { columnIdToMove, targetColumnId },
});

export const deleteCard = (fromColumn, cardId) => ({
  type: BoardActionTypes.MOVE_CARD,
  payload: {
    fromColumn,
    toColumn: null,
    cardId,
  },
});

export const rename = newName => ({
  type: BoardActionTypes.RENAME,
  payload: newName,
});

export const changeBackgroundColor = newBackgroundColor => ({
  type: BoardActionTypes.CHANGE_BG,
  payload: newBackgroundColor,
});
