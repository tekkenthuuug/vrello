import styled from 'styled-components';
import ElementCreator from '../../components/element-creator/element-creator';

export const BoardContainer = styled.div`
  background-color: ${props => props.customBg};
  height: 100vh;
`;

export const ColumnsContainer = styled.div`
  display: flex;
  margin-top: 48px;

  & > * {
    margin-left: 12px;
  }
`;

export const StyledElementCreator = styled(ElementCreator)`
  background-color: #ebecf0;
  width: 256px;
  padding: 8px;
  border-radius: 8px;
`;

export const AddBtn = styled.button`
  width: 256px;
  border-radius: 6px;
  height: 48px;
  font-size: 16px;

  transition: all 0.3s ease;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
  background-color: rgba(255, 255, 255, 0.3);

  svg {
    margin-right: 8px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;
