import { Formik } from 'formik';
import React from 'react';
import { useMutation } from 'react-query';
import { Redirect } from 'react-router-dom';
import InputField from '../../components/input-field/input-field';
import useUserContext from '../../hooks/useUserContext';
import postUserSignUp from '../../react-query/mutations/postUserSignUp';
import {
  FormLink,
  FormPageContainer,
  Heading,
  StyledForm,
  SubmitBtn,
} from '../../shared-styles/form.styles';
import { TOSParagraph } from './signup.styles';

const SignUpFormInitialState = { username: '', email: '', password: '' };

const SignUp = () => {
  const { user, setUser } = useUserContext();

  const signUpMutation = useMutation(postUserSignUp);

  const handleSubmit = async (values, { setErrors }) => {
    try {
      const result = await signUpMutation.mutateAsync(values);
      setUser(result.data.user);
    } catch (error) {
      setErrors(error.response.data.errors);
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
              required
            />
            <InputField
              name='email'
              placeholder='Enter email'
              label='Email'
              type='email'
              disabled={isSubmitting}
              invisibleLabel
              required
            />
            <InputField
              name='password'
              placeholder='Enter password'
              label='Password'
              type='password'
              invisibleLabel
              disabled={isSubmitting}
              passwordMeter
              required
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
