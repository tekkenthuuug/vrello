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
import { useSelector } from 'react-redux';
import {
  selectBoardCreator,
  selectBoardName,
  selectIsBoardOwner,
} from '../../redux/board/board.selectors';
import AddMemberModal from '../add-member-modal/add-member-modal';

const BoardHeader = () => {
  const name = useSelector(selectBoardName);
  const boardCreator = useSelector(selectBoardCreator);
  const isOwner = useSelector(selectIsBoardOwner);

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isAddMemberModalOpened, setIsAddMemberModalOpened] = useState(false);

  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => {
    setIsMenuOpened(false);
  });

  return (
    <HeaderContainer>
      <ItemsContainer>
        <Name>
          {boardCreator.username} / <strong>{name}</strong>
        </Name>
        {isOwner && (
          <HeaderButton onClick={() => setIsAddMemberModalOpened(true)}>
            <MdPersonAdd />
            Invite
          </HeaderButton>
        )}
        {isAddMemberModalOpened && (
          <AddMemberModal onClose={() => setIsAddMemberModalOpened(false)} />
        )}
      </ItemsContainer>
      <ItemsContainer>
        {isOwner && (
          <div ref={dropdownRef}>
            <HeaderButton onClick={() => setIsMenuOpened(s => !s)}>
              <MdMoreHoriz />
              Menu
            </HeaderButton>
            {isMenuOpened && (
              <BoardDropdownMenu onItemClick={() => setIsMenuOpened(false)} />
            )}
          </div>
        )}
      </ItemsContainer>
    </HeaderContainer>
  );
};

export default BoardHeader;
