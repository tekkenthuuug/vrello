import axios from '../../utils/axiosInstance';

const getBoardMembers = async ({ queryKey }) => {
  const [, boardId] = queryKey;

  return await axios.get(`/board/${boardId}/members`);
};

export default getBoardMembers;
