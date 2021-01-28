const removeLeavedBoardsFromCache = selectedBoards => old => {
  old.data.boards = old.data.boards.filter(board => !selectedBoards[board.id]);
  old.data.memberBoards = old.data.memberBoards.filter(
    board => !selectedBoards[board.id]
  );

  return old;
};

export default removeLeavedBoardsFromCache;
