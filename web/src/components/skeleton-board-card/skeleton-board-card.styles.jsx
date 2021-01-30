import styled from 'styled-components';
import {
  BoardCardSpacingCss,
  BoardCardShapeCss,
  BoardCardDisplayCss,
} from '../../shared-styles/board-card.styles';
import { SkeletonLoadingCss } from '../../shared-styles/util.styles';

export const CardContainer = styled.div`
  ${BoardCardShapeCss}
  ${BoardCardSpacingCss}
  ${BoardCardDisplayCss}

  ${SkeletonLoadingCss}

  & > div {
    height: 20px;
    width: 80%;
  }
  & > span {
    height: 16px;
    width: 70%;
  }
`;
