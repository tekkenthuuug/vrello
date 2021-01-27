import styled from 'styled-components';

export const MenuBoardsContainer = styled.section`
  margin-top: 24px;
`;

export const SectionHeading = styled.h1`
  font-family: 'Roboto';
  font-weight: 400;
  line-height: 22px;
`;

export const BoardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;

  & > a {
    &:hover {
      text-decoration: none;
    }
  }
`;
