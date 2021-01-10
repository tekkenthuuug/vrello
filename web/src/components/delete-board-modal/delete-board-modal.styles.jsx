import { Form } from 'formik';
import styled from 'styled-components';

export const StyledForm = styled(Form)`
  width: 400px;
`;

export const Description = styled.p`
  span {
    font-weight: bold;
    padding: 0 4px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 2px;
  }
`;
