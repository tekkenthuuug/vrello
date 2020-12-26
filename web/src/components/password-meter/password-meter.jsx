import React, { memo } from 'react';
import ratePassword from '../../utils/ratePassword';
import { Meter, MeterContainer } from './password-meter.styles';

const PasswordMeter = ({ password }) => {
  const passwordScore = ratePassword(password);

  let width = 0;

  if (passwordScore > 45) {
    width = 100;
  } else if (passwordScore > 25) {
    width = 50;
  } else if (passwordScore > 0) {
    width = 15;
  }

  return (
    <MeterContainer>
      <Meter width={width} />
    </MeterContainer>
  );
};

export default memo(PasswordMeter);
