const removeBoardFromMemberBoardsCache = boardId => old => {
  if (!old) return old;

  old.data.memberBoards = old.data.memberBoards.filter(
    board => board.id !== boardId
  );

  return old;
};

export default removeBoardFromMemberBoardsCache;
