import React, { createContext, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import postSignOut from '../react-query/mutations/postSignOut';
import getMe from '../react-query/queries/getMe';

export const UserStateContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signOutMutation = useMutation(postSignOut);

  const { isLoading: isLoadingMe } = useQuery('me', getMe, {
    onSuccess: result => {
      setUser(result.data.user);
    },
    onError: () => {
      setUser(null);
    },
  });

  const signOut = async () => {
    setUser(null);
    await signOutMutation.mutateAsync();
  };

  return (
    <UserStateContext.Provider
      value={{
        user,
        setUser,
        isLoading: isLoadingMe || signOutMutation.isLoading,
        signOut,
      }}
    >
      {children}
    </UserStateContext.Provider>
  );
};
