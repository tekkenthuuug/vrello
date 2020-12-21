const reorderItems = (columnsArray, from, to, itemId) => {
  const newColumnsArray = [...columnsArray];

  const fromColumn = newColumnsArray.find(el => el.id === from);

  for (let i = 0; i < fromColumn.items.length; i++) {
    const currentItem = fromColumn.items[i];

    if (currentItem.id === itemId) {
      const itemToMove = currentItem;

      fromColumn.items.splice(i, 1);

      // no 'to' means delete
      if (to) {
        const toColumn = newColumnsArray.find(el => el.id === to);

        toColumn.items.push(itemToMove);
      }

      break;
    }
  }

  return newColumnsArray;
};

export default reorderItems;
