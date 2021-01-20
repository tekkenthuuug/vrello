import axios from '../../utils/axiosInstance';

const getMe = async () => {
  return await axios.get(`/auth/me`);
};

export default getMe;
