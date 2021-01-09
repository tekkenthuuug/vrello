import React, { createContext, useState, useCallback } from 'react';
import useFetch from '../hooks/useFetch';
import { API_ROUTES } from '../utils/constants';

export const UserStateContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [checkSession] = useFetch(API_ROUTES.auth.me());
  const [signOutRequest] = useFetch(API_ROUTES.auth.signOut(), {
    method: 'POST',
  });

  const checkUserSession = useCallback(async () => {
    setIsLoading(true);

    const response = await checkSession();

    if (response.success) {
      setUser(response.data.user);
    }

    setIsLoading(false);
  }, [checkSession]);

  const signOut = async () => {
    setUser(null);
    await signOutRequest();
  };

  return (
    <UserStateContext.Provider
      value={{ user, checkUserSession, setUser, isLoading, signOut }}
    >
      {children}
    </UserStateContext.Provider>
  );
};
