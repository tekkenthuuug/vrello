import styled from 'styled-components';

export const MenuPageContainer = styled.div`
  padding-top: 40px;
`;

export const CreateBoardBtn = styled.button`
  background-color: rgba(9, 30, 66, 0.04);
  height: 90px;
  width: 190px;
  font-weight: 600;
  font-size: 18px;
  border-radius: 4px;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
  }
`;
