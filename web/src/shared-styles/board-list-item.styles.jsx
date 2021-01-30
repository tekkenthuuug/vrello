import styled, { css } from 'styled-components';
import { FlexCenterCenterCss } from './util.styles';

export const BoardListItemShapeCss = css`
  width: 100%;
  height: 44px;
`;

export const BoardListItemSpacingCss = css`
  padding: 8px 8px;
  margin-right: 12px;
`;

export const BoardListItemDisplayCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ColorBox = styled.div`
  background-color: ${props => props.backgroundColor};
  width: 20px;
  height: 20px;
  margin-right: 12px;
  border-radius: 4px;

  ${FlexCenterCenterCss}
`;

export const BoardName = styled.div`
  font-weight: 800;
  flex: 2;
  height: 20px;

  word-wrap: break-word;
`;

export const CreatedAt = styled.div`
  flex: 1;
  height: 20px;
  margin-left: 10px;
`;
