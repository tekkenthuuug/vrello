import { Formik } from 'formik';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import InputField from '../../components/input-field/input-field';
import useFetch from '../../hooks/useFetch';
import useSearchParams from '../../hooks/useSearchParams';
import useUserContext from '../../hooks/useUserContext';
import {
  FormError,
  FormLink,
  FormPageContainer,
  Heading,
  StyledForm,
  SubmitBtn,
} from '../../shared-styles/form.styles';
import { API_ROUTES } from '../../utils/constants';

const SignInFormInitialState = {
  username: '',
  password: '',
};

const SignIn = () => {
  const searchParams = useSearchParams();

  const [formError, setFormError] = useState(null);

  const { user, setUser } = useUserContext();

  const [signIn] = useFetch(API_ROUTES.auth.signIn(), {
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

  const nextRoute = searchParams.get('next');

  if (user) {
    return <Redirect to={nextRoute || '/app'} />;
  }

  return (
    <FormPageContainer>
      <Formik initialValues={SignInFormInitialState} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <StyledForm>
            <Heading>Sign in to Vrello</Heading>
            <FormLink to='/signup'>Don't have an account? Sign up!</FormLink>
            {formError && <FormError>{formError}</FormError>}
            <InputField
              name='username'
              placeholder='Enter username'
              label='Username'
              invisibleLabel
              disabled={isSubmitting}
              required
            />
            <InputField
              name='password'
              placeholder='Enter password'
              label='Password'
              type='password'
              invisibleLabel
              required
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
