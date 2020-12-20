import reorderItemsMap from './reorderItemsMap';

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
        data: reorderItemsMap(state.data, from, to, itemId),
      };
    }
    case 'ADD': {
      const { to, item } = payload;
      const newState = { ...state };
      newState.data[to].items.push(item);
      return newState;
    }
    default: {
      return state;
    }
  }
};
