import useUserContext from 'Hooks/useUserContext';
import Application from 'Pages/application/application';
import Home from 'Pages/home/home';
import SignIn from 'Pages/signin/signin';
import SignUp from 'Pages/signup/signup';
import Header from 'Components/header/header';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';

const App = () => {
  const { checkUserSession, isLoading } = useUserContext();

  useEffect(checkUserSession, []);

  if (isLoading) {
    return <div>LOADING...</div>;
  }

  return (
    <>
      <GlobalStyles />
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/app' component={Application} />
      </Switch>
    </>
  );
};

export default App;
