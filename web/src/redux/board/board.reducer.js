import { reorderColumns, reorderCards, findColumn } from './board.utils';
import BoardActionTypes from './board.types';
import { Map, fromJS, List } from 'immutable';

const initialState = Map({
  id: null,
  name: null,
  backgroundColor: null,
  columns: null,
  creatorId: null,
  isLoading: true,
  isDeleted: false,
});

const boardReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case BoardActionTypes.INIT: {
      if (!payload) {
        return state.set('isLoading', false);
      }

      const immutablePayload = fromJS(payload);

      return state.merge(immutablePayload).set('isLoading', false);
    }
    case BoardActionTypes.MOVE_CARD: {
      const { fromColumn, toColumn, cardId } = payload;

      return state.set(
        'columns',
        reorderCards(state.get('columns'), fromColumn, toColumn, cardId)
      );
    }
    case BoardActionTypes.MOVE_COLUMN: {
      const { columnIdToMove, targetColumnId } = payload;

      return state.set(
        'columns',
        reorderColumns(state.get('columns'), columnIdToMove, targetColumnId)
      );
    }
    case BoardActionTypes.ADD_CARD: {
      const { toColumn, card } = payload;

      const [, columnIndex] = findColumn(state.get('columns'), toColumn);

      return state.updateIn(['columns', columnIndex, 'cards'], cards =>
        cards.push(Map(card))
      );
    }
    case BoardActionTypes.ADD_COLUMN: {
      const { column } = payload;
      column.cards = List();

      return state.update('columns', columns => columns.push(Map(column)));
    }
    case BoardActionTypes.CHANGE_BG: {
      return state.set('backgroundColor', payload);
    }
    case BoardActionTypes.RENAME: {
      return state.set('name', payload);
    }
    case BoardActionTypes.RENAME_COLUMN: {
      const { newColumnName, columnId } = payload;

      const [, index] = findColumn(state.get('columns'), columnId);

      return state.setIn(['columns', index, 'name'], newColumnName);
    }
    case BoardActionTypes.DELETE_BOARD: {
      return state.set('isDeleted', true);
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
