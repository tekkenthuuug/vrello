import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import CreateOrEditBoardModal from '../../components/create-or-edit-board-modal/create-or-edit-board-modal';
import useUserContext from '../../hooks/useUserContext';
import postUserBoard from '../../react-query/mutations/postUserBoard';
import getUserBoards from '../../react-query/queries/getUserBoards';
import {
  AddIcon,
  CreateBoardBtn,
  MenuContainer,
  MenuPage,
} from './menu.styles';
import MenuTools from '../../components/menu-tools/menu-tools';
import MenuBoardsSection from '../../components/menu-boards-section/menu-boards-section';

const Menu = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { user } = useUserContext();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedBoards, setSelectedBoards] = useState({});

  const queryKey = ['boards', user.id];

  const {
    data: boardsData,
    isLoading: isLoadingBoards,
    refetch: refetchBoards,
  } = useQuery(queryKey, getUserBoards);

  const userBoardMutation = useMutation(postUserBoard, {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
  });

  const handleCreateBoardModalSubmit = async (values, { setErrors }) => {
    try {
      const result = await userBoardMutation.mutateAsync(values);
      setIsModalOpened(false);

      const board = result.data.board;

      history.push(`/app/${board.creator.slug}/${board.slug}`);
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

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
  console.log(isLoadingBoards);
  console.log(boardsData?.data);
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
        >
          <CreateBoardBtn onClick={() => setIsModalOpened(s => !s)}>
            <AddIcon />
            Create board
          </CreateBoardBtn>
        </MenuBoardsSection>
        <MenuBoardsSection
          label='Boards you are member in'
          isLoading={isLoadingBoards}
          boards={boardsData?.data.memberBoards}
          onBoardCardClick={handleBoardCardClick}
          selectedBoards={selectedBoards}
        />
      </MenuContainer>
      {isModalOpened && (
        <CreateOrEditBoardModal
          onClose={() => setIsModalOpened(false)}
          onSubmit={handleCreateBoardModalSubmit}
        />
      )}
    </MenuPage>
  );
};

export default Menu;
