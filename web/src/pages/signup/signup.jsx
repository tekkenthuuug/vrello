import InputField from 'Components/input-field/input-field';
import { Formik } from 'formik';
import useFetch from 'Hooks/useFetch';
import useUserContext from 'Hooks/useUserContext';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { ROUTES, API_ROUTES } from 'Utils/constants';
import {
  Heading,
  SignupContainer,
  SigninLink,
  StyledForm,
  SubmitBtn,
  TOSParagraph,
} from './signup.styles';

const SignUpFormInitialState = { username: '', email: '', password: '' };

const SignUp = () => {
  const { user, setUser } = useUserContext();

  const { fetchData } = useFetch(API_ROUTES.signup, {
    method: 'POST',
  });

  const handleSubmit = async (values, { setErrors }) => {
    const response = await fetchData(values);

    if (response.success) {
      setUser(response.data.user);
    } else {
      setErrors(response.error);
    }
  };

  if (user) {
    return <Redirect to={ROUTES.menu} />;
  }

  return (
    <SignupContainer>
      <Formik initialValues={SignUpFormInitialState} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <StyledForm>
            <Heading>Sign up for your account</Heading>
            <SigninLink to={ROUTES.signin}>
              Already have an account? Sign in!
            </SigninLink>
            <InputField
              name='username'
              placeholder='Enter username'
              label='Username'
              disabled={isSubmitting}
              invisibleLabel
            />
            <InputField
              name='email'
              placeholder='Enter email'
              label='Email'
              type='email'
              disabled={isSubmitting}
              invisibleLabel
            />
            <InputField
              name='password'
              placeholder='Enter password'
              label='Password'
              type='password'
              invisibleLabel
              disabled={isSubmitting}
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
    </SignupContainer>
  );
};

export default SignUp;