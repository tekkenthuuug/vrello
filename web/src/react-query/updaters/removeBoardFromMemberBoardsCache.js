const removeBoardFromMemberBoardsCache = boardId => old => {
  old.data.memberBoards = old.data.memberBoards.filter(
    board => board.id !== boardId
  );

  return old;
};

export default removeBoardFromMemberBoardsCache;
