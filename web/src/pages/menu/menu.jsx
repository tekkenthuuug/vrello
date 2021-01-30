import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import MenuBoardsSection from '../../components/menu-boards-section/menu-boards-section';
import MenuTools from '../../components/menu-tools/menu-tools';
import useUserContext from '../../hooks/useUserContext';
import deleteOrLeaveBoard from '../../react-query/mutations/deleteOrLeaveBoard';
import getUserBoards from '../../react-query/queries/getUserBoards';
import removeLeavedBoardsFromCache from '../../react-query/updaters/removeLeavedBoardsFromCache';
import { MenuContainer, MenuPage } from './menu.styles';

const Menu = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { user } = useUserContext();

  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [displayAsList, setDisplayAsList] = useState(
    localStorage.getItem('asList') === String(true)
  );
  const [selectedBoards, setSelectedBoards] = useState({});

  const queryKey = ['boards', user.id];

  const {
    data: boardsData,
    isLoading: isLoadingBoards,
    isFetching: isFetchingBoards,
    refetch: refetchBoards,
  } = useQuery(queryKey, getUserBoards);

  const deleteOrLeaveBoardMutation = useMutation(deleteOrLeaveBoard, {
    onSuccess: () => {
      queryClient.setQueryData(
        queryKey,
        removeLeavedBoardsFromCache(selectedBoards)
      );
      setIsSelectionMode(false);
      setSelectedBoards({});
    },
  });

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
    if (isFetchingBoards) return;

    setIsSelectionMode(value => !value);
    setSelectedBoards({});
  };

  const handleDeleteClick = () => {
    const boardsIds = Object.keys(selectedBoards);

    if (boardsIds.length) {
      deleteOrLeaveBoardMutation.mutate(boardsIds);
    }
  };

  const handleChangeViewClick = () => {
    setDisplayAsList(display => {
      localStorage.setItem('asList', String(!display));

      return !display;
    });
  };

  return (
    <MenuPage>
      <MenuContainer>
        <MenuTools
          isUpdating={isFetchingBoards}
          isSelectionMode={isSelectionMode}
          displayAsList={displayAsList}
          onDeleteClick={handleDeleteClick}
          onEditClick={handleEditClick}
          onUpdateClick={refetchBoards}
          onChangeViewClick={handleChangeViewClick}
          selectedBoards={selectedBoards}
        />
        <MenuBoardsSection
          label='Personal boards'
          isLoading={isLoadingBoards}
          boards={boardsData?.data.boards}
          onBoardCardClick={handleBoardCardClick}
          selectedBoards={selectedBoards}
          isSelectionMode={isSelectionMode}
          withAddBoard
          asList={displayAsList}
        />
        <MenuBoardsSection
          label='Boards shared with you'
          isLoading={isLoadingBoards}
          boards={boardsData?.data.memberBoards}
          onBoardCardClick={handleBoardCardClick}
          selectedBoards={selectedBoards}
          isSelectionMode={isSelectionMode}
          asList={displayAsList}
        />
      </MenuContainer>
    </MenuPage>
  );
};

export default Menu;
