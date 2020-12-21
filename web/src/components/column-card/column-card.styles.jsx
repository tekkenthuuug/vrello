import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';

export const DeleteIcon = styled(MdDelete)`
  color: rgba(255, 0, 0, 0.4);
  font-size: 18px;
`;

export const DeleteContainer = styled.div`
  opacity: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px;

  &:hover {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.1);

    ${DeleteIcon} {
      color: rgba(255, 0, 0, 0.8);
    }
  }
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Color = styled.div`
  background-color: blue;
  border-radius: 4px;
  width: 40px;
  height: 22px;
`;

export const CardContainer = styled.div`
  background-color: white;
  color: black;
  width: 100%;
  cursor: pointer;
  padding: 8px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  margin-bottom: 8px;
  border-radius: 3px;

  &:hover {
    ${DeleteContainer} {
      opacity: 1;
    }
  }
`;

export const Description = styled.p`
  font-size: 14px;
  margin-left: 1px;
  margin-top: 2px;
`;
