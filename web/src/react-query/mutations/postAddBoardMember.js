import axios from '../../utils/axiosInstance';

const postAddBoardMember = boardId => async userId => {
  return await axios.post(`/board/${boardId}/add-member`, { userId });
};

export default postAddBoardMember;
