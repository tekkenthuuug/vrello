import { Formik } from 'formik';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Redirect } from 'react-router-dom';
import InputField from '../../components/input-field/input-field';
import useSearchParams from '../../hooks/useSearchParams';
import useUserContext from '../../hooks/useUserContext';
import postUserSignIn from '../../react-query/mutations/postUserSignIn';
import {
  FormError,
  FormLink,
  FormPageContainer,
  Heading,
  StyledForm,
  SubmitBtn,
} from '../../shared-styles/form.styles';

const SignInFormInitialState = {
  username: '',
  password: '',
};

const SignIn = () => {
  const searchParams = useSearchParams();

  const [formError, setFormError] = useState(null);

  const { user, setUser } = useUserContext();

  const signInMutation = useMutation(postUserSignIn, {
    onSuccess: result => {
      setUser(result.data.user);
    },
    onError: error => {
      setFormError(error.response.data.message);
    },
  });

  const handleSubmit = async values => {
    signInMutation.mutate(values);
  };

  if (user) {
    const nextRoute = searchParams.get('next');

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
            <SubmitBtn type='submit' isLoading={isSubmitting}>
              Sign in
            </SubmitBtn>
          </StyledForm>
        )}
      </Formik>
    </FormPageContainer>
  );
};

export default SignIn;
