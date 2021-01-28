import styled, { css } from 'styled-components';
import { MdDone } from 'react-icons/md';
import {
  BoardCardSpacingCss,
  BoardCardDisplayCss,
  BoardCardShapeCss,
} from '../../shared-styles/board-card.styles';

export const BoardCardOverlay = styled.div`
  position: absolute;
  display: none;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.07);
`;

export const BoardName = styled.div`
  font-weight: 800;
  font-size: 18px;
`;

export const CreatedAt = styled.div`
  font-size: 12px;
`;

export const BoardCardContainer = styled.div`
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;
  overflow: hidden;
  color: #fff;

  ${props =>
    props.isSelected &&
    css`
      transform: translateY(-6px);
    `}

  ${BoardCardDisplayCss}

  background-color: ${props => props.backgroundColor};

  ${BoardCardShapeCss}

  ${BoardCardSpacingCss}

  &:hover {
    ${BoardCardOverlay} {
      display: block;
    }
  }
`;

export const DoneIcon = styled(MdDone)`
  border: 2px solid #fff;
  border-radius: 4px;
  font-size: 26px;
  position: absolute;
  right: 12px;

  animation: appearDoneIcon 0.2s ease forwards;

  @keyframes appearDoneIcon {
    from {
      opacity: 0;
      bottom: -26px;
    }
    to {
      opacity: 1;
      bottom: 8px;
    }
  }
`;
