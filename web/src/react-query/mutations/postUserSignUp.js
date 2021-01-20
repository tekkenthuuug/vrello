import axios from '../../utils/axiosInstance';

const postSignUp = async signUpData => {
  return await axios.post('/auth/sign-up', signUpData);
};

export default postSignUp;
