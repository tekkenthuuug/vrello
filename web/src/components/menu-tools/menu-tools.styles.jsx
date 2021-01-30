import {
  MdAutorenew,
  MdEdit,
  MdExitToApp,
  MdGridOn,
  MdList,
} from 'react-icons/md';
import styled, { css } from 'styled-components';
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

export const ListIcon = styled(MdList)`
  font-size: 26px;

  ${ClickableIconCss}
`;

export const GridIcon = styled(MdGridOn)`
  font-size: 26px;

  ${ClickableIconCss}
`;

export const UpdateIcon = styled(MdAutorenew)`
  font-size: 26px;
  margin-left: 8px;

  ${ClickableIconCss}

  ${props =>
    props.isSpinning &&
    css`
      animation: updateIconAnimation 1s linear infinite;
      &:hover {
        background-color: transparent;
      }
      @keyframes updateIconAnimation {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `}
`;

export const ItemsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const MenuToolsContainer = styled.div`
  display: flex;

  margin-top: 24px;
`;

export const ToolsBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 2px solid #cccccc;
  width: 100%;

  padding-bottom: 8px;
`;

export const SelectedCount = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #949292;

  & > span {
    color: #026aa7;
  }
`;

export const Spacer = styled.div`
  min-width: 14px;
`;
