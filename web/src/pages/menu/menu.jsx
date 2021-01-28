import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import MenuBoardsSection from '../../components/menu-boards-section/menu-boards-section';
import MenuTools from '../../components/menu-tools/menu-tools';
import useUserContext from '../../hooks/useUserContext';
import getUserBoards from '../../react-query/queries/getUserBoards';
import { MenuContainer, MenuPage } from './menu.styles';

const Menu = () => {
  const history = useHistory();
  const { user } = useUserContext();

  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedBoards, setSelectedBoards] = useState({});

  const {
    data: boardsData,
    isLoading: isLoadingBoards,
    refetch: refetchBoards,
  } = useQuery(['boards', user.id], getUserBoards);

  const handleBoardCardClick = board => {
    if (isSelectionMode) {
      setSelectedBoards(boards => {
        const boardsCopy = { ...boards };
        if (boardsCopy[board.id]) {
          delete boardsCopy[board.id];
        } else {
          boardsCopy[board.id] = true;
        }

        return boardsCopy;
      });
    } else {
      history.push(`/app/${board.creator?.slug || user.slug}/${board.slug}`);
    }
  };

  const handleEditClick = () => {
    setIsSelectionMode(value => {
      // if was true, reset selectedBoards
      if (value) {
        setSelectedBoards({});
      }

      return !value;
    });
  };

  return (
    <MenuPage>
      <MenuContainer>
        <MenuTools
          onEditClick={handleEditClick}
          onUpdateClick={refetchBoards}
          selectedBoards={selectedBoards}
          isSelectionMode={isSelectionMode}
        />
        <MenuBoardsSection
          label='Boards you own'
          isLoading={isLoadingBoards}
          boards={boardsData?.data.boards}
          onBoardCardClick={handleBoardCardClick}
          selectedBoards={selectedBoards}
          withAddBoard
        />
        <MenuBoardsSection
          label='Boards you are member in'
          isLoading={isLoadingBoards}
          boards={boardsData?.data.memberBoards}
          onBoardCardClick={handleBoardCardClick}
          selectedBoards={selectedBoards}
        />
      </MenuContainer>
    </MenuPage>
  );
};

export default Menu;
