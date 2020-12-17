const reorderItemsMap = (itemsMap, from, to, itemId) => {
  const newItemsMap = { ...itemsMap };

  for (let i = 0; i < newItemsMap[from].items.length; i++) {
    const currentItem = newItemsMap[from].items[i];

    if (currentItem.id === Number(itemId)) {
      const itemToMove = currentItem;

      newItemsMap[from].items.splice(i, 1);

      newItemsMap[to].items.push(itemToMove);

      break;
    }
  }

  return newItemsMap;
};

export default reorderItemsMap;
