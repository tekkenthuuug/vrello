import { createSelector } from 'reselect';

const selectBoard = state => state.board;

export const selectBoardBackgroundColor = createSelector([selectBoard], board =>
  board.get('backgroundColor')
);

export const selectBoardIsLoading = createSelector([selectBoard], board =>
  board.get('isLoading')
);

export const selectBoardName = createSelector([selectBoard], board =>
  board.get('name')
);

export const selectColumnsIds = createSelector([selectBoard], board =>
  board
    .get('columns')
    .map(column => column.get('id'))
    .toJS()
);

export const selectColumn = columnId =>
  createSelector([selectBoard], board => {
    return board.get('columns')
      ? board
          .get('columns')
          .find(column => column.get('id') === columnId)
          .toJS()
      : null;
  });
