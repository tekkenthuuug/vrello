import { reorderColumns, reorderCards } from './board.utils';
import BoardActionTypes from './board.types';

const initialState = {
  id: null,
  name: null,
  backgroundColor: null,
  columns: null,
  creatorId: null,
  isLoading: true,
};

const boardReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case BoardActionTypes.INIT: {
      return { ...state, ...payload, isLoading: false };
    }
    case BoardActionTypes.MOVE_CARD: {
      const { fromColumn, toColumn, cardId } = payload;
      return {
        ...state,
        columns: reorderCards(state.columns, fromColumn, toColumn, cardId),
      };
    }
    case BoardActionTypes.MOVE_COLUMN: {
      const { columnIdToMove, targetColumnId } = payload;

      return {
        ...state,
        columns: reorderColumns(state.columns, columnIdToMove, targetColumnId),
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
    case BoardActionTypes.CHANGE_BG: {
      return {
        ...state,
        backgroundColor: payload,
      };
    }
    case BoardActionTypes.RENAME: {
      return {
        ...state,
        name: payload,
      };
    }
    case BoardActionTypes.RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default boardReducer;
