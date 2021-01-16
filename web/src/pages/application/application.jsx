import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';
import Board from '../board/board';
import Menu from '../menu/menu';

const Application = ({ match, location }) => {
  const { user } = useUserContext();

  if (!user) {
    // TODO: add next param to url
    return <Redirect to='/signin' />;
  }

  return (
    <Switch>
      <Route exact path={match.path} component={Menu} />
      <Route path={`${match.path}/:creatorSlug/:boardSlug`} component={Board} />
    </Switch>
  );
};

export default Application;
