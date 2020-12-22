import Board from 'Pages/board/board';
import SignIn from 'Pages/signin/signin';
import SignUp from 'Pages/signup/signup';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Switch>
        <Route exact path='/' component={Board} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
      </Switch>
    </>
  );
};

export default App;
