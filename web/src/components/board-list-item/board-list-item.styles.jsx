import styled, { css } from 'styled-components';
import {
  BoardListItemShapeCss,
  BoardListItemSpacingCss,
  BoardListItemDisplayCss,
} from '../../shared-styles/board-list-item.styles';
import { MdDone } from 'react-icons/md';

export const DoneIcon = styled(MdDone)`
  font-size: 24px;
  color: rgba(255, 255, 255, 0.8);

  animation: appearDoneIcon 0.2s ease forwards;

  @keyframes appearDoneIcon {
    from {
      opacity: 0;
      transform: scale(0);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const BoardListItemContainer = styled.div`
  cursor: pointer;
  overflow: hidden;
  color: #202124;
  font-size: 16px;

  ${BoardListItemDisplayCss}

  ${BoardListItemSpacingCss}

  border-bottom: 1px solid #ccc;

  ${BoardListItemShapeCss}

  transition: transform 0.3s ease;

  ${props =>
    props.isSelected &&
    css`
      transform: translateX(-24px);
    `}

  &:nth-last-child(2) {
    border: none;
  }

  &:hover {
    background-color: rgba(0, 0, 255, 0.1);
  }
`;
