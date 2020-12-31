import styled from 'styled-components';
import { MdMoreHoriz } from 'react-icons/md';

export const ColumnHeaderContainer = styled.div`
  padding: 8px 12px;
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
`;

export const ColumnName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  max-width: 90%;
`;

export const MoreIcon = styled(MdMoreHoriz)`
  font-size: 28px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.7);
`;
