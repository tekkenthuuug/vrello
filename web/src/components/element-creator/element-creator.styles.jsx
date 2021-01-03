import { MdClose } from 'react-icons/md';
import ColorSelector from '../color-selector/color-selector';
import styled from 'styled-components';

export const CardCreatorContainer = styled.form`
  display: flex;
  flex-direction: column;

  height: fit-content;
`;

export const FieldContainerContainer = styled.div`
  background-color: white;
  color: black;
  width: 100%;
  padding: 8px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  border-radius: 3px;
  margin-bottom: 8px;
`;

export const DescriptionTextArea = styled.textarea`
  width: 100%;
  resize: none;
  height: ${props => props.height || '54px'};
  background: none;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background: #c2c1c1;
    border-radius: 2px;
  }
`;

export const DescriptionInput = styled.input`
  width: 100%;
`;

export const Buttons = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
`;

export const AddCardBtn = styled.button`
  background-color: #5aac44;
  color: #fff;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;

  &:hover {
    color: #fff;
    background-color: #61bd4f;
  }
`;

export const CloseIcon = styled(MdClose)`
  margin-left: 8px;
  font-size: 24px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.4);

  transition: all 0.3s ease;

  &:hover {
    border-radius: 4px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const StyledColorSelector = styled(ColorSelector)`
  margin-bottom: 0px;
`;
