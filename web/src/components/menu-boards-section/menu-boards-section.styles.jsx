import { MdAdd } from 'react-icons/md';
import styled, { css } from 'styled-components';
import {
  BoardCardShapeCss,
  BoardCardSpacingCss,
} from '../../shared-styles/board-card.styles';
import {
  BoardListItemSpacingCss,
  BoardListItemShapeCss,
} from '../../shared-styles/board-list-item.styles';
import { FlexCenterCenterCss } from '../../shared-styles/util.styles';

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

export const CreateBoardBtn = styled.button`
  background-color: rgba(9, 30, 66, 0.04);

  ${FlexCenterCenterCss}

  font-weight: 600;

  ${BoardCardShapeCss}
  ${BoardCardSpacingCss}
  font-size: 18px;

  transition: background-color 0.3s ease;

  ${props =>
    props.asList &&
    css`
      ${BoardListItemShapeCss}
      ${BoardListItemSpacingCss}
    `}

  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
  }
`;

export const AddIcon = styled(MdAdd)`
  margin-right: 8px;
`;
