import findColumnIndexById from './findColumnIndexById';
import insertIntoArray from './insertIntoArray';

const reorderColumns = (columnsArray, columnId, targetColumnId) => {
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

export default reorderColumns;
