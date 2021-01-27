import { createSelector } from 'reselect';

const selectBoard = state => state.board;

export const selectBoardBackgroundColor = createSelector(
  [selectBoard],
  board => board.backgroundColor
);

export const selectBoardId = createSelector([selectBoard], board => board.id);

export const selectBoardIsLoading = createSelector(
  [selectBoard],
  board => board.isLoading
);

export const selectBoardName = createSelector(
  [selectBoard],
  board => board.name
);

export const selectHasAccess = createSelector(
  [selectBoard],
  board => board.hasAccess
);

export const selectBoardCreator = createSelector(
  [selectBoard],
  board => board.creator
);

export const selectColumnsIds = createSelector([selectBoard], board =>
  board.columns.map(column => column.id)
);

export const selectColumn = columnId =>
  createSelector([selectBoard], board => {
    return board.columns
      ? board.columns.find(column => column.id === columnId)
      : null;
  });

export const selectBoardIsDeleted = createSelector(
  [selectBoard],
  board => board.isDeleted
);

export const selectIsBoardOwner = createSelector(
  [selectBoard],
  board => board.isOwner
);
