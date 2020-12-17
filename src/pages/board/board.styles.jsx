import styled from 'styled-components';

export const BoardContainer = styled.div`
  background-color: ${props => props.customBg};
  height: 100vh;
`;

export const ColumnsContainer = styled.div`
  display: flex;
  margin-top: 48px;

  & > * {
    margin-left: 12px;
  }
`;
