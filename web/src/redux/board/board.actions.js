import BoardActionTypes from './board.types';

export const initializeBoard = (boardData, currentUser) => ({
  type: BoardActionTypes.INIT,
  payload: { boardData, currentUser },
});

export const addCard = (toColumnId, card) => ({
  type: BoardActionTypes.ADD_CARD,
  payload: {
    toColumnId,
    card,
  },
});

export const moveCard = (fromColumnId, toColumnId, cardId, targetCardId) => ({
  type: BoardActionTypes.MOVE_CARD,
  payload: {
    fromColumnId,
    toColumnId,
    cardId,
    targetCardId,
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

export const deleteCard = (fromColumnId, cardId) => ({
  type: BoardActionTypes.MOVE_CARD,
  payload: {
    fromColumnId,
    toColumnId: null,
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

export const renameColumn = (columnId, newColumnName) => ({
  type: BoardActionTypes.RENAME_COLUMN,
  payload: { columnId, newColumnName },
});

export const reset = () => ({
  type: BoardActionTypes.RESET,
});

export const deleteBoard = () => ({
  type: BoardActionTypes.DELETE_BOARD,
});

export const noAccess = boardId => ({
  type: BoardActionTypes.NO_ACCESS,
  payload: boardId,
});
