import axios from '../../utils/axiosInstance';

const postSignIn = async signInData => {
  return await axios.post('/auth/sign-in', signInData);
};

export default postSignIn;
