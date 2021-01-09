export const findColumn = (columnsArray, columnId) => {
  for (let i = 0; i < columnsArray.size; i++) {
    if (columnsArray.getIn([i, 'id']) === columnId) {
      return [columnsArray.get(i), i];
    }
  }
  return [null, null];
};

export const reorderCards = (columnsArray, from, to, cardId) => {
  const [fromColumn, fromIndex] = findColumn(columnsArray, from);

  const [toColumn, toIndex] = to ? findColumn(columnsArray, to) : [null, null];

  let newFromColumn = null;
  let newToColumn = null;

  for (let i = 0; i < fromColumn.get('cards').size; i++) {
    const currentCard = fromColumn.getIn(['cards', i]);

    if (currentCard?.get('id') === cardId) {
      const cardToMove = currentCard;

      newFromColumn = fromColumn.update('cards', cards => cards.splice(i, 1));
      // no 'to' means delete
      if (toColumn) {
        // cardToMove already immutable
        newToColumn = toColumn.update('cards', cards => cards.push(cardToMove));
      }

      break;
    }
  }

  // task not found in column
  if (fromIndex === null || newFromColumn === null) {
    return columnsArray;
  }

  let newColumnsArray = columnsArray.set(fromIndex, newFromColumn);

  // in case we delete task
  if (toIndex !== null && newToColumn !== null) {
    newColumnsArray = newColumnsArray.set(toIndex, newToColumn);
  }

  return newColumnsArray;
};

export const reorderColumns = (columnsArray, columnId, targetColumnId) => {
  let [columnToMove, columnToMoveIndex] = findColumn(columnsArray, columnId);

  let [, targetColumnIndex] = targetColumnId
    ? findColumn(columnsArray, targetColumnId)
    : [null, null];

  if (targetColumnIndex === columnToMoveIndex) {
    return columnsArray;
  }

  return columnsArray
    .splice(columnToMoveIndex, 1)
    .splice(targetColumnIndex, 0, columnToMove);
};
