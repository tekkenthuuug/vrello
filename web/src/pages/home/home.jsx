import React from 'react';
import { Redirect } from 'react-router-dom';
import { ROUTES } from 'Utils/constants';

const Home = () => {
  return <Redirect to={ROUTES.signin} />;
};

export default Home;
