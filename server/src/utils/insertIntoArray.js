const insertIntoArray = (arr, element, index) => {
  return [...arr.slice(0, index), element, ...arr.slice(index, arr.length)];
};

module.exports = insertIntoArray;
