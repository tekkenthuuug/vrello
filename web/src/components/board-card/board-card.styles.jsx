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

  word-wrap: break-word;
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
  ${props =>
    props.grayscale &&
    css`
      filter: grayscale(100);
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
  color: rgba(255, 255, 255, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

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
