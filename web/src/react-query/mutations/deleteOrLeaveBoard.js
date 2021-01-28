import axios from '../../utils/axiosInstance';

const deleteOrLeaveBoard = async ids => {
  return await axios.delete(`/board/delete-or-leave`, { data: { ids } });
};

export default deleteOrLeaveBoard;
