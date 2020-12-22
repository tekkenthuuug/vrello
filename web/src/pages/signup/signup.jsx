import InputField from 'Components/input-field/input-field';
import { Formik } from 'formik';
import React from 'react';
import {
  Heading,
  SigninContainer,
  SigninLink,
  StyledForm,
  SubmitBtn,
  TOSParagraph,
} from './signup.styles';

const SignIn = () => {
  return (
    <SigninContainer>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={(values, { setErrors }) => {
          console.log(values);
        }}
      >
        {({ isSubmitting, values }) => (
          <StyledForm>
            <Heading>Sign up for your account</Heading>
            <SigninLink to='/signin'>
              Already have an account? Sign in!
            </SigninLink>
            <InputField
              name='username'
              placeholder='Enter username'
              label='Username'
              invisibleLabel
            />
            <InputField
              name='email'
              placeholder='Enter email'
              label='Email'
              type='email'
              invisibleLabel
            />
            <InputField
              name='password'
              placeholder='Enter password'
              label='Password'
              type='password'
              invisibleLabel
              passwordMeter
            />
            <TOSParagraph>
              By signing up, you confirm that you've read and accepted our{' '}
              <a>Terms of Service</a> and <a>Privacy Policy</a>.
            </TOSParagraph>
            <SubmitBtn type='submit' disabled={isSubmitting}>
              Sign up
            </SubmitBtn>
          </StyledForm>
        )}
      </Formik>
    </SigninContainer>
  );
};

export default SignIn;
