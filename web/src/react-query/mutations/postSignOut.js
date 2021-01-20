import axios from '../../utils/axiosInstance';

const postSignOut = async () => {
  return await axios.post('/auth/sign-out');
};

export default postSignOut;
