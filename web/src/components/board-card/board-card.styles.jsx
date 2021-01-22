import styled from 'styled-components';
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
  color: #fff;
`;

export const CreatedAt = styled.div`
  font-size: 12px;
  color: #fff;
`;

export const BoardCardContainer = styled.div`
  position: relative;

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
