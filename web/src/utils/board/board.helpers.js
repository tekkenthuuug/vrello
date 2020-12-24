import insertIntoArray from '../insertIntoArray';

export const reorderCards = (columnsArray, from, to, cardId) => {
  const newColumnsArray = [...columnsArray];

  const fromColumn = newColumnsArray.find(el => el.id === from);

  for (let i = 0; i < fromColumn.items.length; i++) {
    const currentCard = fromColumn.items[i];

    if (currentCard.id === cardId) {
      const cardToMove = currentCard;

      fromColumn.items.splice(i, 1);

      // no 'to' means delete
      if (to) {
        const toColumn = newColumnsArray.find(el => el.id === to);

        toColumn.items.push(cardToMove);
      }

      break;
    }
  }

  return newColumnsArray;
};

export const findColumnIndexById = (arr, id) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return i;
    }
  }
};

export const reorderColumns = (columnsArray, columnId, targetColumnId) => {
  let columnToMoveIndex = findColumnIndexById(columnsArray, columnId);

  let targetColumnIndex = findColumnIndexById(columnsArray, targetColumnId);

  if (targetColumnIndex === columnToMoveIndex) {
    return columnsArray;
  }

  const columnsArrayClone = [...columnsArray];

  return insertIntoArray(
    columnsArrayClone,
    columnsArrayClone.splice(columnToMoveIndex, 1)[0],
    targetColumnIndex
  );
};
