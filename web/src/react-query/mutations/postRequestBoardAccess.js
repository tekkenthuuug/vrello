import axios from '../../utils/axiosInstance';

const postRequestBoardAccess = async boardId => {
  return await axios.post(`/board/${boardId}/request-access`);
};

export default postRequestBoardAccess;
