import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Header from './components/header/header';
import LoadingScreen from './components/loading-screen/loading-screen';
import useUserContext from './hooks/useUserContext';
import Home from './pages//home/home';
import Application from './pages/application/application';
import SignIn from './pages/signin/signin';
import SignUp from './pages/signup/signup';
import { DEFAULT_TOAST_PROPS } from './utils/constants';

const App = () => {
  const { isLoading } = useUserContext();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Header />
      <ToastContainer {...DEFAULT_TOAST_PROPS} />
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
