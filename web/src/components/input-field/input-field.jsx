import PasswordStrength from '../password-meter/password-meter';
import { useField } from 'formik';
import React from 'react';
import {
  StyledInputControl,
  Input,
  InputContainer,
} from './input-field.styles';
import { InputLabel } from '../../shared-styles/input.styles';
import { InputErrorMessage } from '../../shared-styles/input.styles';

const InputField = ({
  label,
  invisibleLabel,
  passwordMeter,
  size: _,
  children,
  className,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <StyledInputControl hasErrored={!!error} className={className}>
      {!invisibleLabel && <InputLabel htmlFor={field.name}>{label}</InputLabel>}
      <InputContainer>
        <Input
          {...field}
          {...props}
          id={field.name}
          aria-label={invisibleLabel ? label : undefined}
        />
        {children}
      </InputContainer>
      {props.type === 'password' && passwordMeter && (
        <PasswordStrength password={field.value} />
      )}
      {error && <InputErrorMessage>{error}</InputErrorMessage>}
    </StyledInputControl>
  );
};

export default InputField;
