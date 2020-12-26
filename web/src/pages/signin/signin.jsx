import InputField from 'Components/input-field/input-field';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  FormError,
  SubmitBtn,
  FormPageContainer,
  StyledForm,
  Heading,
  FormLink,
} from 'Styles/form.styles';
import useFetch from 'Hooks/useFetch';
import useUserContext from 'Hooks/useUserContext';
import { ROUTES, API_ROUTES } from 'Utils/constants';
import { Redirect } from 'react-router-dom';

const SignInFormInitialState = {
  username: '',
  password: '',
};

const SignIn = () => {
  const [formError, setFormError] = useState(null);

  const { user, setUser } = useUserContext();

  const [signIn] = useFetch(API_ROUTES.auth.signin(), {
    method: 'POST',
  });

  const handleSubmit = async values => {
    const response = await signIn(values);

    if (response.success) {
      setUser(response.data.user);
    } else {
      setFormError(response.error);
    }
  };

  if (user) {
    return <Redirect to={ROUTES.app.index} />;
  }

  return (
    <FormPageContainer>
      <Formik initialValues={SignInFormInitialState} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <StyledForm>
            <Heading>Sign in to Vrello</Heading>
            <FormLink to={ROUTES.signup}>
              Don't have an account? Sign up!
            </FormLink>
            {formError && <FormError>{formError}</FormError>}
            <InputField
              name='username'
              placeholder='Enter username'
              label='Username'
              invisibleLabel
              disabled={isSubmitting}
            />
            <InputField
              name='password'
              placeholder='Enter password'
              label='Password'
              invisibleLabel
              disabled={isSubmitting}
            />
            <SubmitBtn type='submit' disabled={isSubmitting}>
              Sign in
            </SubmitBtn>
          </StyledForm>
        )}
      </Formik>
    </FormPageContainer>
  );
};

export default SignIn;
