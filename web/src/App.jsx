import Board from 'Pages/board/board';
import SignIn from 'Pages/signin/signin';
import SignUp from 'Pages/signup/signup';
import Home from 'Pages/home/home';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import { UserProvider } from 'Contexts/userContext';
import { ROUTES } from 'Utils/constants';

const App = () => {
  return (
    <UserProvider>
      <GlobalStyles />
      <Switch>
        <Route exact path={ROUTES.home} component={Home} />
        <Route path={ROUTES.signin} component={SignIn} />
        <Route path={ROUTES.signup} component={SignUp} />
        <Route path={ROUTES.board} component={Board} />
      </Switch>
    </UserProvider>
  );
};

export default App;
