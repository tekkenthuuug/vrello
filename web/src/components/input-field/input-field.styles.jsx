import styled, { css } from 'styled-components';

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

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2em;

  ${props =>
    props.hasErrored &&
    css`
      ${Input} {
        border: 2px solid #ff0000;
      }
    `}
`;

export const FormLabel = styled.label`
  margin-left: 2px;
  margin-bottom: 4px;
`;

export const FormErrorMessage = styled.div`
  color: red;
  margin-top: 4px;
  &::before {
    content: '*';
    margin-right: 4px;
  }
`;
