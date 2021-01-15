import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  font-size: 24px;
  color: #fff;

  display: flex;
  justify-content: space-between;
  padding: 0 12px;
`;

export const Name = styled.h1`
  font-size: 18px;
  font-weight: normal;
`;

export const HeaderButton = styled.button`
  background-color: rgba(255, 255, 255, 0.25);
  color: #fff;
  height: 32px;
  padding: 0 12px;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;

  margin-left: 12px;

  svg {
    margin-right: 6px;
    font-size: 18px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

export const ItemsContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  position: relative;
`;
