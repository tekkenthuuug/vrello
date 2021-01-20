import styled, { css } from 'styled-components';
import { InputControl } from '../../shared-styles/input.styles';

export const InputContainer = styled.div`
  position: relative;
`;

export const Input = styled.input`
  border: 2px solid #dfe1e6;
  height: 44px;
  font-size: 14px;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafbfc;
  width: 100%;

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
