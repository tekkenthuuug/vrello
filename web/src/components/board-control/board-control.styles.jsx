import styled from 'styled-components';
import { FlexCenterCenterCss } from '../../shared-styles/util.styles';
import ElementCreator from '../element-creator/element-creator';

export const ColumnsContainer = styled.div`
  display: flex;
  margin-top: 24px;
  overflow-x: auto;
  overflow-y: hidden;
  height: 80vh;

  ::-webkit-scrollbar-button {
    display: block;
    height: 4px;
    width: 4px;
  }
  ::-webkit-scrollbar-track-piece {
    background: rgba(0, 0, 0, 0.15);
  }
  ::-webkit-scrollbar {
    height: 12px;
    width: 12px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);

    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }
  }

  & > * {
    margin-left: 12px;
    flex-basis: 256px;
    flex-shrink: 0;
  }
`;

export const StyledElementCreator = styled(ElementCreator)`
  background-color: #ebecf0;
  width: 256px;
  padding: 8px;
  border-radius: 8px;
`;

export const AddBtn = styled.button`
  width: 256px;
  border-radius: 6px;
  height: 48px;
  font-size: 16px;

  transition: all 0.3s ease;

  ${FlexCenterCenterCss}

  color: #fff;
  background-color: rgba(255, 255, 255, 0.3);

  svg {
    margin-right: 8px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;
