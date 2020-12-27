import styled, { css } from 'styled-components';
import { InputControl } from '../../shared-styles/input.styles';

export const Input = styled.input`
  border: 2px solid #dfe1e6;
  height: 44px;
  font-size: 14px;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafbfc;

  transition: background-color 0.2s ease-in-out 0s,
    border-color 0.2s ease-in-out 0s;

  &:focus {
    background-color: #ffffff;
    border: 2px solid #4c9aff;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export const StyledInputControl = styled(InputControl)`
  ${props =>
    props.hasErrored &&
    css`
      ${Input} {
        border: 2px solid #ff0000;
      }
    `}
`;

export const InputErrorMessage = styled.div`
  color: red;
  margin-top: 4px;
  &::before {
    content: '*';
    margin-right: 4px;
  }
`;
