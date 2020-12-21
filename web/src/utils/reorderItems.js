const reorderItems = (itemsArray, from, to, itemId) => {
  const newItemsArray = [...itemsArray];

  const fromColumn = newItemsArray.find(el => el.id === from);

  for (let i = 0; i < fromColumn.items.length; i++) {
    const currentItem = fromColumn.items[i];

    if (currentItem.id === itemId) {
      const itemToMove = currentItem;

      fromColumn.items.splice(i, 1);

      // no 'to' means delete
      if (to) {
        const toColumn = newItemsArray.find(el => el.id === to);

        toColumn.items.push(itemToMove);
      }

      break;
    }
  }

  return newItemsArray;
};

export default reorderItems;
