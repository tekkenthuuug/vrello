import React, { useState, useEffect } from 'react';
import {
  MenuPage,
  BoardsGrid,
  MenuContainer,
  SectionHeading,
  AddIcon,
} from './menu.styles';
import { CreateBoardBtn } from './menu.styles';
import CreateBoardModal from '../../components/create-board-modal/create-board-modal';
import BoardCard from '../../components/board-card/board-card';
import useUserContext from '../../hooks/useUserContext';
import useFetch from '../../hooks/useFetch';
import { API_ROUTES } from '../../utils/constants';

const Menu = () => {
  const { user } = useUserContext();

  const [isModalOpened, setIsModalOpened] = useState(false);

  const [fetchBoards, { response, isLoading }] = useFetch(
    API_ROUTES.user.boards(user.id)
  );

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { boards } = response.data;

  return (
    <MenuPage>
      <MenuContainer>
        <SectionHeading>Personal boards</SectionHeading>
        <BoardsGrid>
          {boards.map(board => (
            <BoardCard key={board.id} board={board} />
          ))}
          <CreateBoardBtn onClick={() => setIsModalOpened(s => !s)}>
            <AddIcon />
            Create board
          </CreateBoardBtn>
        </BoardsGrid>
        {isModalOpened && (
          <CreateBoardModal onClose={() => setIsModalOpened(false)} />
        )}
      </MenuContainer>
    </MenuPage>
  );
};

export default Menu;
