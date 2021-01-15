export const findColumn = (columnsArray, columnId) => {
  for (let i = 0; i < columnsArray.length; i++) {
    if (columnsArray[i].id === columnId) {
      return [columnsArray[i], i];
    }
  }
  return [null, null];
};

export const reorderCards = (draft, fromColumn, toColumn, cardId) => {
  const [fromColumnRef, fromIndex] = findColumn(draft.columns, fromColumn);

  const [, toIndex] = findColumn(draft.columns, toColumn);

  for (let i = 0; i < fromColumnRef.cards.length; i++) {
    const currentCard = fromColumnRef.cards[i];

    if (currentCard?.id === cardId) {
      const cardToMove = currentCard;

      draft.columns[fromIndex].cards.splice(i, 1);

      // no 'to' means delete
      if (toIndex !== null) {
        draft.columns[toIndex].cards.push(cardToMove);
      }

      break;
    }
  }

  return;
};

export const reorderColumns = (draft, columnIdToMove, targetColumnId) => {
  let [columnToMove, columnToMoveIndex] = findColumn(
    draft.columns,
    columnIdToMove
  );

  let [, targetColumnIndex] = findColumn(draft.columns, targetColumnId);

  if (targetColumnIndex === columnToMoveIndex) {
    return;
  }

  draft.columns.splice(columnToMoveIndex, 1);

  if (targetColumnIndex !== null) {
    draft.columns.splice(targetColumnIndex, 0, columnToMove);
  }
};
