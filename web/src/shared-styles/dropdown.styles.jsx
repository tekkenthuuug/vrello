import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: absolute;
  top: 40px;
  right: 0px;
  background-color: #fff;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25),
    0 0 0 1px rgba(9, 30, 66, 0.08);
  border-radius: 3px;
  color: #172b4d;
  width: 300px;
  padding: 12px 0;
  font-size: 14px;
  transform-origin: top right;
  z-index: 100;

  @keyframes appearDropdown {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  animation: appearDropdown 0.2s ease;
`;

export const List = styled.ul`
  list-style: none;
`;

export const ListItem = styled.li`
  height: 32px;
  padding: 6px 12px;
  font-weight: normal;
  cursor: pointer;

  display: flex;
  align-items: center;

  svg {
    margin-right: 6px;
    color: rgba(0, 0, 0, 0.7);
  }

  &:hover {
    background-color: rgba(9, 30, 66, 0.04);
  }
`;
