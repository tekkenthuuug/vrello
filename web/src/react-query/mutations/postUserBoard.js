import axios from '../../utils/axiosInstance';

const postUserBoard = async newBoard => {
  return await axios.post(`/board/create`, newBoard);
};

export default postUserBoard;
