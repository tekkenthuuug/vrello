import axios from '../../utils/axiosInstance';
import objectToSearchParams from '../../utils/objectToSearchParams';

const getUsersByEmail = async ({ queryKey }) => {
  const [, searchParams] = queryKey;

  const searchParamsObj = objectToSearchParams(searchParams);

  return await axios.get(`/users/search?${searchParamsObj.toString()}`);
};

export default getUsersByEmail;
