import {
  reorderColumns,
  reorderCards,
  findByIdInObjArray,
} from './board.utils';
import BoardActionTypes from './board.types';
import produce from 'immer';

const initialState = {
  id: null,
  name: null,
  backgroundColor: null,
  columns: null,
  creator: null,
  isLoading: true,
  hasAccess: true,
  isDeleted: false,
  isOwner: false,
};

const boardReducer = (state = initialState, { payload, type }) =>
  produce(state, draft => {
    switch (type) {
      case BoardActionTypes.INIT: {
        const { boardData, currentUser } = payload;
        draft.backgroundColor = boardData.backgroundColor;
        draft.id = boardData.id;
        draft.name = boardData.name;
        draft.columns = boardData.columns;
        draft.creator = boardData.creator;
        draft.isOwner = boardData.creator.id === currentUser.id;
        draft.isLoading = false;

        return;
      }
      case BoardActionTypes.MOVE_CARD: {
        const { fromColumnId, toColumnId, cardId, targetCardId } = payload;

        reorderCards(draft, fromColumnId, toColumnId, cardId, targetCardId);

        return;
      }
      case BoardActionTypes.MOVE_COLUMN: {
        const { columnIdToMove, targetColumnId } = payload;

        reorderColumns(draft, columnIdToMove, targetColumnId);

        return;
      }
      case BoardActionTypes.ADD_CARD: {
        const { toColumnId, card } = payload;

        const [, columnIndex] = findByIdInObjArray(draft.columns, toColumnId);

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

        const [, index] = findByIdInObjArray(state.columns, columnId);

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
      case BoardActionTypes.NO_ACCESS: {
        draft.isLoading = false;
        draft.hasAccess = false;
        draft.id = payload;

        return;
      }
      default: {
        return;
      }
    }
  });

export default boardReducer;
