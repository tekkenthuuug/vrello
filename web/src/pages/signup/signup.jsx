import InputField from '../../components/input-field/input-field';
import { Formik } from 'formik';
import useFetch from '../../hooks/useFetch';
import useUserContext from '../../hooks/useUserContext';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { API_ROUTES } from '../../utils/constants';
import { TOSParagraph } from './signup.styles';
import {
  SubmitBtn,
  FormPageContainer,
  StyledForm,
  Heading,
  FormLink,
} from '../../shared-styles/form.styles';

const SignUpFormInitialState = { username: '', email: '', password: '' };

const SignUp = () => {
  const { user, setUser } = useUserContext();

  const [signUp] = useFetch(API_ROUTES.auth.signUp(), {
    method: 'POST',
  });

  const handleSubmit = async (values, { setErrors }) => {
    const response = await signUp(values);

    if (response.success) {
      setUser(response.data.user);
    } else {
      setErrors(response.error);
    }
  };

  if (user) {
    return <Redirect to='/app' />;
  }

  return (
    <FormPageContainer>
      <Formik initialValues={SignUpFormInitialState} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <StyledForm>
            <Heading>Sign up for your account</Heading>
            <FormLink to='/signin'>Already have an account? Sign in!</FormLink>
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
              <a href='/#'>Terms of Service</a> and{' '}
              <a href='/#'>Privacy Policy</a>.
            </TOSParagraph>
            <SubmitBtn type='submit' disabled={isSubmitting}>
              Sign up
            </SubmitBtn>
          </StyledForm>
        )}
      </Formik>
    </FormPageContainer>
  );
};

export default SignUp;
