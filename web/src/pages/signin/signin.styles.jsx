import { Form } from 'formik';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SigninContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20vh;
  background-color: #f9fafc;
`;

export const StyledForm = styled(Form)`
  width: 400px;
  background-color: #ffffff;
  padding: 25px 40px;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
`;

export const SubmitBtn = styled.button`
  width: 100%;
  background-color: #61bd4f;
  padding: 8px 16px;
  border-radius: 5px;
  font-weight: bold;
  color: #fff;

  &:disabled {
    opacity: 0.5;
  }
`;

export const Heading = styled.h1`
  font-size: 18px;
  margin-top: 10px;
  color: #5e6c84;
  text-align: center;
`;

export const SignupLink = styled(Link)`
  text-align: center;
  margin-bottom: 25px;
  display: block;
`;

export const FormError = styled.div`
  text-align: center;
  padding: 8px;
  background-color: #ff3232;
  color: white;
  font-weight: 600;
  margin-bottom: 18px;
  border-radius: 4px;
`;
