import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { ClickableIconCss } from '../../shared-styles/util.styles';

export const ProfileCardContainer = styled.div`
  position: relative;

  padding: 6px 12px;
  font-weight: normal;
  display: flex;
  width: 100%;
`;

export const InfoContainer = styled.div`
  margin-left: 16px;
`;

export const Username = styled.div`
  color: #172b4d;
`;

export const Email = styled.div`
  font-size: 12px;
  color: #b3bac5;
`;

export const CloseIcon = styled(MdClose)`
  position: absolute;
  font-size: 20px;
  top: 8px;
  right: 8px;

  ${ClickableIconCss}

  &:hover {
    color: #7d828a;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
