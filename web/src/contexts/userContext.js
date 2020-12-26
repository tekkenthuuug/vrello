import React, { createContext, useState } from 'react';
import useFetch from 'Hooks/useFetch';
import { API_ROUTES } from 'Utils/constants';

export const UserStateContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [checkSession] = useFetch(API_ROUTES.auth.me());

  const checkUserSession = async () => {
    setIsLoading(true);

    const response = await checkSession();

    if (response.success) {
      setUser(response.data.user);
    }
    setIsLoading(false);
  };

  return (
    <UserStateContext.Provider
      value={{ user, checkUserSession, setUser, isLoading }}
    >
      {children}
    </UserStateContext.Provider>
  );
};
