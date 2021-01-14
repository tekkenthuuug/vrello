import styled from 'styled-components';
import { MdMoreHoriz } from 'react-icons/md';

export const ColumnHeaderContainer = styled.div`
  padding: 4px 6px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
`;

export const ColumnName = styled.textarea`
  font-size: 20px;
  font-weight: 600;
  max-width: 90%;
  resize: none;
  background-color: #ebecf0;
  padding: 4px 6px;
  height: 34px;
  overflow: hidden;
  cursor: pointer;

  &:focus-within {
    cursor: text;
    background-color: #fff;
    box-shadow: inset 0 0 0 2px #4c9aff;
  }
`;

export const MoreContainer = styled.div`
  height: 34px;
  width: 34px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const MoreIcon = styled(MdMoreHoriz)`
  margin: 4px;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.5);
`;
