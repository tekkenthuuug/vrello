const removeMemberFromBoardMembersCache = memberId => old => {
  old.data.members = old.data.members.filter(member => member.id !== memberId);
  return old;
};

export default removeMemberFromBoardMembersCache;
