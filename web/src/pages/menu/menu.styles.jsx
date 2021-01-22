import styled from 'styled-components';
import { MdAdd, MdUpdate } from 'react-icons/md';
import { BoardCardShapeCss } from '../../shared-styles/board-card.styles';
import {
  ClickableIconCss,
  FlexCenterCenterCss,
} from '../../shared-styles/util.styles';

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

export const AddIcon = styled(MdAdd)`
  margin-right: 8px;
`;

export const UpdateIcon = styled(MdUpdate)`
  font-size: 26px;

  ${ClickableIconCss}
`;

export const Section = styled.section`
  margin-top: 24px;
`;

export const SectionHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-family: 'Roboto';
    font-weight: 400;
  }
`;
