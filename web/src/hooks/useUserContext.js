import { useContext } from 'react';
import { UserStateContext } from '../contexts/userContext';

const useUserContext = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export default useUserContext;
