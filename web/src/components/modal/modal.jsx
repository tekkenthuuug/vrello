import React from 'react';
import ReactDOM from 'react-dom';
import {
  ModalOverlay,
  ModalContainer,
  Header,
  Heading,
  ChildContainer,
  CloseIcon,
} from './modal.styles';

const Modal = ({ children, onClose, name }) => {
  return ReactDOM.createPortal(
    <ModalOverlay onMouseDown={onClose}>
      <ModalContainer
        onMouseDown={e => e.stopPropagation()}
        onClick={e => e.stopPropagation()}
      >
        <Header>
          <Heading>{name}</Heading>
          <CloseIcon onClick={onClose} />
        </Header>
        <ChildContainer>{children}</ChildContainer>
      </ModalContainer>
    </ModalOverlay>,
    document.getElementById('modal')
  );
};

export default Modal;
