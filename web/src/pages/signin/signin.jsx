import InputField from 'Components/input-field/input-field';
import { Formik } from 'formik';
import React from 'react';
import {
  Heading,
  SigninContainer,
  SignupLink,
  StyledForm,
  SubmitBtn,
} from './signin.styles';
import { ROUTES } from 'Utils/constants';

const SignIn = () => {
  return (
    <SigninContainer>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, { setErrors }) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <Heading>Sign in to Vrello</Heading>
            <SignupLink to={ROUTES.signup}>
              Already have an account? Sign in!
            </SignupLink>
            <InputField
              name='username'
              placeholder='Enter username'
              label='Username'
              invisibleLabel
            />
            <InputField
              name='password'
              placeholder='Enter password'
              label='Password'
              invisibleLabel
            />
            <SubmitBtn type='submit'>Sign in</SubmitBtn>
          </StyledForm>
        )}
      </Formik>
    </SigninContainer>
  );
};

export default SignIn;
