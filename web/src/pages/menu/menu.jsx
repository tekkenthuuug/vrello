import React, { useEffect } from 'react';
import useFetch from 'Hooks/useFetch';
import useUserContext from 'Hooks/useUserContext';
import { MenuPageContainer } from './menu.styles';
import { API_ROUTES } from 'Utils/constants';
import { Link } from 'react-router-dom';

const Menu = ({ match }) => {
  const { user } = useUserContext();
  const [fetchBoards, { isLoading, data }] = useFetch(
    API_ROUTES.user.boards(user.uid)
  );

  // useEffect(fetchBoards, []);

  return (
    <MenuPageContainer>
      <Link to={`${match.url}/board/${1}`}>Click me</Link>
    </MenuPageContainer>
  );
};

export default Menu;
