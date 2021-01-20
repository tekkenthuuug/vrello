import axios from '../../utils/axiosInstance';

const postUserBoards = async newBoard => {
  return await axios.post(`/board/create`, newBoard);
};

export default postUserBoards;
