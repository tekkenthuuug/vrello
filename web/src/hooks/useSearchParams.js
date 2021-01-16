import { useLocation } from 'react-router-dom';

const useSearchParams = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

export default useSearchParams;
