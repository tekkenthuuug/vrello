import { MdAutorenew, MdEdit, MdExitToApp } from 'react-icons/md';
import styled from 'styled-components';
import { ClickableIconCss } from '../../shared-styles/util.styles';

export const EditIcon = styled(MdEdit)`
  font-size: 26px;

  ${ClickableIconCss}
`;

export const LeaveIcon = styled(MdExitToApp)`
  font-size: 26px;
  margin-left: 12px;

  ${ClickableIconCss}

  color: red;
`;

export const UpdateIcon = styled(MdAutorenew)`
  font-size: 26px;
  margin-left: 8px;

  ${ClickableIconCss}
`;

export const ItemsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 24px;
  margin-bottom: -14px;
`;

export const MenuToolsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-right: 12px;
`;

export const SelectedCount = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
