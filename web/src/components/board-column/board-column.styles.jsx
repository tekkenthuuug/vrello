import styled from 'styled-components';
import { FlexCenterCenterCss } from '../../shared-styles/util.styles';

export const ColumnContainer = styled.div`
  position: relative;

  background-color: #ebecf0;
  border-radius: 4px;
  color: black;
  overflow: hidden;
  width: 256px;
  padding-bottom: 8px;
  height: fit-content;
`;

export const TasksContainer = styled.div`
  margin-top: 12px;
  min-height: 71px;
  max-height: 60vh;
  overflow-x: hidden;
  overflow-y: auto;

  ::-webkit-scrollbar-button {
    display: block;
    height: 4px;
    width: 4px;
  }

  ::-webkit-scrollbar-track-piece {
    background: rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }
`;

export const ColumnContent = styled.div`
  padding: 0 8px;
`;

export const AddBtn = styled.button`
  width: 100%;
  border-radius: 4px;
  height: 48px;
  font-size: 16px;
  font-weight: 800;
  border: 2px solid rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.2);

  transition: all 0.3s ease;

  ${FlexCenterCenterCss}

  svg {
    margin-right: 8px;
  }

  &:hover {
    border-color: rgba(0, 0, 0, 0.2);
    color: rgba(0, 0, 0, 0.4);
  }
`;
