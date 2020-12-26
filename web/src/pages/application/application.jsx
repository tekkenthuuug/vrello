import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Board from 'Pages/board/board';
import Menu from 'Pages/menu/menu';

const Application = ({ match }) => {
  return (
    <Switch>
      <Route exact path={match.path} component={Menu} />
      <Route path={`${match.path}/board/:boardId`} component={Board} />
    </Switch>
  );
};

export default Application;
