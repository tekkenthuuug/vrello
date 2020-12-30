import { createSelector } from 'reselect';

const selectBoard = state => state.board;

export const selectBoardBackgroundColor = createSelector(
  [selectBoard],
  board => board.backgroundColor
);

export const selectBoardIsLoading = createSelector(
  [selectBoard],
  board => board.isLoading
);

export const selectBoardName = createSelector(
  [selectBoard],
  board => board.name
);

export const selectInitialBoardEditValues = createSelector(
  [selectBoard],
  board => ({ name: board.name, backgroundColor: board.backgroundColor })
);

export const selectColumnsIds = createSelector([selectBoard], board =>
  board.columns.map(column => column.id)
);

export const selectColumn = id =>
  createSelector([selectBoard], board =>
    board.columns ? board.columns.find(column => column.id === id) : null
  );
