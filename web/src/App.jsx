import useUserContext from './hooks/useUserContext';
import Application from './pages/application/application';
import Home from './pages//home/home';
import SignIn from './pages/signin/signin';
import SignUp from './pages/signup/signup';
import LoadingScreen from './components/loading-screen/loading-screen';
import Header from './components/header/header';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const App = () => {
  const { checkUserSession, isLoading } = useUserContext();

  useEffect(checkUserSession, [checkUserSession]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <GlobalStyles />
      <Header />
      <ToastContainer
        position='top-right'
        autoClose={7500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
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
