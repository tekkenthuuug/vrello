import styled from 'styled-components';
import { SkeletonLoadingCss } from '../../shared-styles/util.styles';
import {
  BoardListItemShapeCss,
  BoardListItemDisplayCss,
  BoardListItemSpacingCss,
} from '../../shared-styles/board-list-item.styles';

export const BoardListItemContainer = styled.div`
  ${BoardListItemShapeCss}
  ${BoardListItemSpacingCss}
  ${BoardListItemDisplayCss}

  ${SkeletonLoadingCss}
`;
