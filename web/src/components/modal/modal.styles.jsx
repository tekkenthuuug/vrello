import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { FlexCenterCenterCss } from '../../shared-styles/util.styles';

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  ${FlexCenterCenterCss}
  padding-bottom: 10vh;
  z-index: 100;

  @keyframes appearModal {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: appearModal 0.2s ease;
`;

export const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 12px;
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export const Heading = styled.h3`
  font-weight: normal;
`;

export const ChildContainer = styled.div`
  padding: 12px;
`;

export const CloseIcon = styled(MdClose)`
  font-size: 20px;
  cursor: pointer;
`;
