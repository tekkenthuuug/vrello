import React from 'react';
import { LoadingSpinnerContainer } from './loading-spinner.styles';

const LoadingSpinner = ({ color }) => {
  return (
    <LoadingSpinnerContainer customColor={color}>
      <div></div>
      <div></div>
    </LoadingSpinnerContainer>
  );
};

export default LoadingSpinner;
