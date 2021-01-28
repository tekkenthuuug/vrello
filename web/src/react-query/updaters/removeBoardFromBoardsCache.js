const removeBoardFromBoardsCache = boardId => old => {
  old.data.boards = old.data.boards.filter(board => board.id !== boardId);

  return old;
};

export default removeBoardFromBoardsCache;
