import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Board from '../board/board';
import Menu from '../menu/menu';

const Application = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Menu} />
      <Route path={`${match.path}/board/:boardId`} component={Board} />
    </Switch>
  );
};

export default Application;
