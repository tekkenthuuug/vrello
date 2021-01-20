import styled from 'styled-components';

export const InputLabel = styled.label`
  margin-bottom: 4px;
`;

export const InputControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2em;
`;

export const InputErrorMessage = styled.div`
  color: red;
  margin-top: 4px;
  &::before {
    content: '*';
    margin-right: 4px;
  }
`;
