import styled from 'styled-components';
import { FlexCenterCenterCss } from '../../shared-styles/util.styles';

export const ColorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ColorItem = styled.div`
  background-color: ${props => props.color};

  width: 28px;
  height: 28px;

  border-radius: 2px;

  margin: 0 4px 4px 0;

  color: #fff;
  ${FlexCenterCenterCss}
  font-size: 20px;

  cursor: pointer;
`;

export const ColorSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2em;
`;
