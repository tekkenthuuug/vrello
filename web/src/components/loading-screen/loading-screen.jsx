import React from 'react';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import { LoadingScreenContainer } from './loading-screen.styles';

const LoadingScreen = () => {
  return (
    <LoadingScreenContainer>
      <LoadingSpinner />
    </LoadingScreenContainer>
  );
};

export default LoadingScreen;
