import { MdDelete, MdEdit, MdUpdate } from 'react-icons/md';
import styled from 'styled-components';
import { ClickableIconCss } from '../../shared-styles/util.styles';

export const EditIcon = styled(MdEdit)`
  font-size: 26px;

  ${ClickableIconCss}
`;

export const DeleteIcon = styled(MdDelete)`
  font-size: 26px;
  margin-left: 12px;

  ${ClickableIconCss}

  color: red;
`;

export const UpdateIcon = styled(MdUpdate)`
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
`;

export const SelectedCount = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
