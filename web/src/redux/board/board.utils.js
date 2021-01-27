export const findByIdInObjArray = (objArray, objectId) => {
  for (let i = 0; i < objArray.length; i++) {
    if (objArray[i].id === objectId) {
      return [objArray[i], i];
    }
  }
  return [null, null];
};

export const reorderCards = (
  { columns },
  fromColumnId,
  toColumnId,
  cardId,
  targetCardId
) => {
  const [fromColumnRef] = findByIdInObjArray(columns, fromColumnId);

  const [toColumnRef] = findByIdInObjArray(columns, toColumnId);

  const fromColumnCards = fromColumnRef.cards;

  for (let i = fromColumnCards.length; i >= 0; i--) {
    const currentCard = fromColumnCards[i];

    if (currentCard?.id === cardId) {
      const cardToMove = currentCard;

      fromColumnCards.splice(i, 1);

      // no 'toColumnRef' means delete
      if (toColumnRef !== null) {
        const toColumnCards = toColumnRef.cards;

        if (targetCardId !== null) {
          const [, targetCardIndex] = findByIdInObjArray(
            toColumnCards,
            targetCardId
          );

          toColumnCards.splice(targetCardIndex + 1, 0, cardToMove);
        } else {
          toColumnCards.push(cardToMove);
        }
      }

      break;
    }
  }
};

export const reorderColumns = ({ columns }, columnIdToMove, targetColumnId) => {
  let [columnToMove, columnToMoveIndex] = findByIdInObjArray(
    columns,
    columnIdToMove
  );

  let [, targetColumnIndex] = findByIdInObjArray(columns, targetColumnId);

  if (targetColumnIndex === columnToMoveIndex) {
    return;
  }

  columns.splice(columnToMoveIndex, 1);

  if (targetColumnIndex !== null) {
    columns.splice(targetColumnIndex, 0, columnToMove);
  }
};
