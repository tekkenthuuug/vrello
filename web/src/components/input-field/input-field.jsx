import PasswordStrength from 'Components/password-meter/password-meter';
import { useField } from 'formik';
import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from './input-field.styles';

const InputField = ({
  label,
  invisibleLabel,
  passwordMeter,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl>
      {!invisibleLabel && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <Input
        {...field}
        {...props}
        id={field.name}
        aria-label={invisibleLabel ? label : undefined}
      />
      {props.type === 'password' && passwordMeter && (
        <PasswordStrength password={field.value} />
      )}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
