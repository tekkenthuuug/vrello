import PasswordStrength from '../password-meter/password-meter';
import { useField } from 'formik';
import React from 'react';
import {
  StyledInputControl,
  InputErrorMessage,
  Input,
} from './input-field.styles';
import { InputLabel } from '../../shared-styles/input.styles';

const InputField = ({
  label,
  invisibleLabel,
  passwordMeter,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <StyledInputControl hasErrored={!!error}>
      {!invisibleLabel && <InputLabel htmlFor={field.name}>{label}</InputLabel>}
      <Input
        {...field}
        {...props}
        id={field.name}
        aria-label={invisibleLabel ? label : undefined}
      />
      {props.type === 'password' && passwordMeter && (
        <PasswordStrength password={field.value} />
      )}
      {error && <InputErrorMessage>{error}</InputErrorMessage>}
    </StyledInputControl>
  );
};

export default InputField;
