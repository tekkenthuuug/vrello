import styled from 'styled-components';

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2em;
`;

export const FormLabel = styled.label``;

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
`;

export const FormErrorMessage = styled.div``;
