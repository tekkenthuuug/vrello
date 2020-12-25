import { Form } from 'formik';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SignupContainer = styled.div`
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

  transition: opacity 0.3s ease;

  &:disabled {
    opacity: 0.5;
    cursor: wait;
  }
`;

export const Heading = styled.h1`
  font-size: 18px;
  margin-top: 10px;
  color: #5e6c84;
  text-align: center;
`;

export const TOSParagraph = styled.p`
  font-size: 12px;
  color: #5e6c84;
  margin: 20px 0 20px;
`;

export const SigninLink = styled(Link)`
  text-align: center;
  margin-bottom: 25px;
  display: block;
`;
