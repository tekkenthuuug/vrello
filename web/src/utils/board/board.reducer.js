import { reorderColumns, reorderCards } from './board.helpers';
import BoardActionTypes from './board.types';

export const initialState = {
  id: null,
  name: null,
  columns: null,
  isLoading: true,
};

export const boardReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case BoardActionTypes.INIT: {
      return { ...state, ...payload, isLoading: false };
    }
    case BoardActionTypes.MOVE_CARD: {
      const { fromColumn, toColumn, cardId } = payload;
      return {
        ...state,
        columns: reorderCards(state.data, fromColumn, toColumn, cardId),
      };
    }
    case BoardActionTypes.MOVE_COLUMN: {
      const { columnIdToMove, targetColumnId } = payload;

      return {
        ...state,
        columns: reorderColumns(state.data, columnIdToMove, targetColumnId),
      };
    }
    case BoardActionTypes.ADD_CARD: {
      const { toColumn, card } = payload;
      const newState = { ...state };

      newState.columns.find(column => column.id === toColumn).cards.push(card);

      return newState;
    }
    case BoardActionTypes.ADD_COLUMN: {
      const { column } = payload;
      const newState = { ...state };
      newState.columns.push(column);
      return newState;
    }
    default: {
      return state;
    }
  }
};
