import { reorderColumns, reorderCards, findColumn } from './board.utils';
import BoardActionTypes from './board.types';
import produce from 'immer';

const initialState = {
  id: null,
  name: null,
  backgroundColor: null,
  columns: null,
  creator: null,
  isLoading: true,
};

const boardReducer = (state = initialState, { payload, type }) =>
  produce(state, draft => {
    switch (type) {
      case BoardActionTypes.INIT: {
        draft.backgroundColor = payload.backgroundColor;
        draft.id = payload.id;
        draft.name = payload.name;
        draft.columns = payload.columns;
        draft.creator = payload.creator;
        draft.isLoading = false;

        return;
      }
      case BoardActionTypes.MOVE_CARD: {
        const { fromColumn, toColumn, cardId } = payload;

        reorderCards(draft, fromColumn, toColumn, cardId);

        return;
      }
      case BoardActionTypes.MOVE_COLUMN: {
        const { columnIdToMove, targetColumnId } = payload;

        reorderColumns(draft, columnIdToMove, targetColumnId);

        return;
      }
      case BoardActionTypes.ADD_CARD: {
        const { toColumn, card } = payload;

        const [, columnIndex] = findColumn(draft.columns, toColumn);

        draft.columns[columnIndex].cards.push(card);

        return;
      }
      case BoardActionTypes.ADD_COLUMN: {
        const { column } = payload;
        column.cards = [];

        draft.columns.push(column);

        return;
      }
      case BoardActionTypes.CHANGE_BG: {
        draft.backgroundColor = payload;

        return;
      }
      case BoardActionTypes.RENAME: {
        draft.name = payload;

        return;
      }
      case BoardActionTypes.RENAME_COLUMN: {
        const { newColumnName, columnId } = payload;

        const [, index] = findColumn(state.columns, columnId);

        draft.columns[index].name = newColumnName;

        return;
      }
      case BoardActionTypes.DELETE_BOARD: {
        draft.isDeleted = true;

        return;
      }
      case BoardActionTypes.RESET: {
        return initialState;
      }
      default: {
        return;
      }
    }
  });

export default boardReducer;
