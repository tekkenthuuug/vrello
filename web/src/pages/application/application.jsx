import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';
import Board from '../board/board.container';
import Menu from '../menu/menu';

const Application = ({ match, location }) => {
  const { user } = useUserContext();

  if (!user) {
    const params = new URLSearchParams();

    if (location.pathname !== '/app') {
      params.set('next', location.pathname);
    }

    return <Redirect to={`/signin?${params.toString()}`} />;
  }

  return (
    <Switch>
      <Route exact path={match.path} component={Menu} />
      <Route path={`${match.path}/:creatorSlug/:boardSlug`} component={Board} />
    </Switch>
  );
};

export default Application;
