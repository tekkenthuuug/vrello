import reorderItems from './reorderItems';
import insertIntoArray from './insertIntoArray';
import findColumnIndexById from './findColumnIndexById';

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
      const newState = { ...state };

      let columnToMoveIndex = findColumnIndexById(newState.data, columnId);

      let targetColumnIndex = findColumnIndexById(
        newState.data,
        targetColumnId
      );

      if (targetColumnIndex === columnToMoveIndex) {
        return newState;
      }

      newState.data = insertIntoArray(
        newState.data,
        newState.data.splice(columnToMoveIndex, 1)[0],
        targetColumnIndex
      );

      return newState;
    }
    case 'ADD_CARD': {
      const { to, item } = payload;
      const newState = { ...state };

      newState.data.find(el => el.id === to).items.push(item);

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
