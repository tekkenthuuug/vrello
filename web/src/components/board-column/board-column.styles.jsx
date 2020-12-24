import styled from 'styled-components';

export const ColumnContainer = styled.div`
  position: relative;

  background-color: #ebecf0;
  border-radius: 8px;
  color: black;
  overflow: hidden;
  width: 256px;
  padding-bottom: 8px;
  height: fit-content;
`;

export const ColumnName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  padding: 8px 12px;
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
`;

export const CardsContainer = styled.div`
  margin-top: 12px;
  min-height: 71px;
`;

export const ColumnContent = styled.div`
  padding: 0 8px;
`;

export const AddBtn = styled.button`
  width: 100%;
  border-radius: 6px;
  height: 48px;
  font-size: 16px;
  font-weight: 800;
  border: 3px dashed rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.2);

  transition: all 0.3s ease;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 8px;
  }

  &:hover {
    border-color: rgba(0, 0, 0, 0.2);
    color: rgba(0, 0, 0, 0.4);
  }
`;
