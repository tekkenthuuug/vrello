import React, { useRef, useState } from 'react';
import {
  HeaderContainer,
  Name,
  HeaderButton,
  ItemsContainer,
} from './board-header.styles';
import { MdMoreHoriz, MdPersonAdd } from 'react-icons/md';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import BoardDropdownMenu from '../board-dropdown-menu/board-dropdown-menu';

const BoardHeader = ({ name }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => {
    setIsMenuOpened(false);
  });

  return (
    <HeaderContainer>
      <ItemsContainer>
        <Name>{name}</Name>
        <HeaderButton>
          <MdPersonAdd />
          Invite
        </HeaderButton>
      </ItemsContainer>
      <ItemsContainer>
        <div ref={dropdownRef}>
          <HeaderButton onClick={() => setIsMenuOpened(s => !s)}>
            <MdMoreHoriz />
            Menu
          </HeaderButton>
          {isMenuOpened && (
            <BoardDropdownMenu onItemClick={() => setIsMenuOpened(false)} />
          )}
        </div>
      </ItemsContainer>
    </HeaderContainer>
  );
};

export default BoardHeader;
