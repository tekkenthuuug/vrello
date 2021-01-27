import { MdAdd } from 'react-icons/md';
import styled from 'styled-components';
import { BoardCardShapeCss } from '../../shared-styles/board-card.styles';
import { FlexCenterCenterCss } from '../../shared-styles/util.styles';

export const MenuPage = styled.div`
  padding-top: 40px;
`;

export const MenuContainer = styled.div`
  position: relative;

  max-width: 835px;
  width: 95%;
  margin: 0 auto;
`;

export const CreateBoardBtn = styled.button`
  background-color: rgba(9, 30, 66, 0.04);

  ${FlexCenterCenterCss}

  font-weight: 600;

  ${BoardCardShapeCss}
  font-size: 18px;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
  }
`;

export const AddIcon = styled(MdAdd)`
  margin-right: 8px;
`;

export const SectionHeading = styled.h1`
  font-family: 'Roboto';
  font-weight: 400;
  line-height: 22px;
`;

export const HeaderItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
