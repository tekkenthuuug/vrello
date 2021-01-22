import { Form } from 'formik';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FlexCenterCenterCss } from './util.styles';

export const FormPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  ${FlexCenterCenterCss}
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

  transition: all 0.2s ease;

  ${props =>
    props.isLoading &&
    css`
      opacity: 0.5 !important;
      cursor: wait !important;
    `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #519839;
  }
`;

export const Heading = styled.h1`
  font-size: 18px;
  margin-top: 10px;
  color: #5e6c84;
  text-align: center;
`;

export const FormLink = styled(Link)`
  text-align: center;
  margin-bottom: 25px;
  display: block;
  color: #0052cc;
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
