import axios from '../../utils/axiosInstance';

const getUserBoards = async ({ queryKey }) => {
  const [, userId] = queryKey;

  return await axios.get(`/users/${userId}/boards`);
};

export default getUserBoards;
