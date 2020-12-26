import useUserContext from './hooks/useUserContext';
import Application from './pages/application/application';
import Home from './pages//home/home';
import SignIn from './pages/signin/signin';
import SignUp from './pages/signup/signup';
import Header from './components/header/header';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';

const App = () => {
  const { checkUserSession, isLoading } = useUserContext();

  useEffect(checkUserSession, [checkUserSession]);

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
