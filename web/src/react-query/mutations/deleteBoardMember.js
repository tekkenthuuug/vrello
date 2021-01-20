import axios from '../../utils/axiosInstance';

const deleteBoardMember = boardId => async userId => {
  return await axios.delete(`/board/${boardId}/members/${userId}`);
};

export default deleteBoardMember;
