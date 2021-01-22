import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { BoardCardShapeCss } from '../../shared-styles/board-card.styles';

export const MenuPage = styled.div`
  padding-top: 40px;
`;

export const MenuContainer = styled.div`
  max-width: 835px;
  width: 95%;
  margin: 0 auto;
`;

export const CreateBoardBtn = styled.button`
  background-color: rgba(9, 30, 66, 0.04);
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 600;

  ${BoardCardShapeCss}
  font-size: 18px;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
  }
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

export const SectionHeading = styled.h2`
  font-family: 'Roboto';
  font-weight: 400;
  margin-top: 24px;
`;

export const AddIcon = styled(MdAdd)`
  margin-right: 8px;
`;
