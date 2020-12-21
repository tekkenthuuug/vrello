import reorderItems from './reorderItems';
import reorderColumns from './reorderColumns';

export const initialState = {
  id: null,
  name: null,
  data: null,
  isLoading: true,
};

export const boardReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case 'INIT': {
      return { ...state, ...payload, isLoading: false };
    }
    case 'MOVE': {
      const { from, to, itemId } = payload;
      return {
        ...state,
        data: reorderItems(state.data, from, to, itemId),
      };
    }
    case 'MOVE_COLUMN': {
      const { columnId, targetColumnId } = payload;

      return {
        ...state,
        data: reorderColumns(state.data, columnId, targetColumnId),
      };
    }
    case 'ADD_CARD': {
      const { to, item } = payload;
      const newState = { ...state };

      newState.data.find(column => column.id === to).items.push(item);

      return newState;
    }
    case 'ADD_COLUMN': {
      const { item } = payload;
      const newState = { ...state };
      newState.data.push(item);
      return newState;
    }
    default: {
      return state;
    }
  }
};
