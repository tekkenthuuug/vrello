import reorderItemsMap from './reorderItemsMap';

export const initialState = {
  name: 'Board',
  data: {
    0: {
      name: 'Not unique',
      items: [
        { id: 0, description: 'Text1' },
        { id: 1, description: 'Text2' },
      ],
    },
    1: {
      name: 'Not unique',
      items: [
        { id: 2, description: 'Text3' },
        { id: 3, description: 'Text4' },
      ],
    },
    2: {
      name: 'Not unique',
      items: [
        { id: 4, description: 'Text5' },
        { id: 5, description: 'Text6' },
      ],
    },
  },
};

export const boardReducer = (state = initialState, { payload, type }) => {
  switch (type) {
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
