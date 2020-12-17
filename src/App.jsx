import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Board from 'Pages/board/board';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Switch>
        <Route path='/' component={Board} />
      </Switch>
    </>
  );
};

export default App;
