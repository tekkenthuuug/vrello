import React, { useState, useEffect } from 'react';
import {
  MenuPage,
  BoardsContainer,
  MenuContainer,
  SectionHeading,
  AddIcon,
} from './menu.styles';
import { CreateBoardBtn } from './menu.styles';
import CreateOrEditBoardModal from '../../components/create-or-edit-board-modal/create-or-edit-board-modal';
import BoardCard from '../../components/board-card/board-card';
import useUserContext from '../../hooks/useUserContext';
import useFetch from '../../hooks/useFetch';
import { API_ROUTES } from '../../utils/constants';
import { useHistory } from 'react-router-dom';

const Menu = () => {
  const history = useHistory();
  const { user } = useUserContext();

  const [isModalOpened, setIsModalOpened] = useState(false);

  const [fetchBoards, { response, isLoading }] = useFetch(
    API_ROUTES.user.boards(user.id)
  );
  const [createBoard] = useFetch(API_ROUTES.board.create(), { method: 'POST' });

  const handleCreateBoardModalSubmit = async (values, { setErrors }) => {
    const response = await createBoard(values);

    if (response.success) {
      const { board } = response.data;
      setIsModalOpened(false);
      history.push(`/app/board/${board.id}`);
    } else {
      setErrors(response.error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchBoards();
    })();
  }, [fetchBoards]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { boards, memberBoards } = response.data;

  return (
    <MenuPage>
      <MenuContainer>
        <SectionHeading>Your boards</SectionHeading>
        <BoardsContainer>
          {boards.map(board => (
            <BoardCard key={board.id} board={board} />
          ))}
          <CreateBoardBtn onClick={() => setIsModalOpened(s => !s)}>
            <AddIcon />
            Create board
          </CreateBoardBtn>
        </BoardsContainer>
        <SectionHeading>Boards you are member in</SectionHeading>
        <BoardsContainer>
          {memberBoards.map(board => (
            <BoardCard key={board.id} board={board} />
          ))}
        </BoardsContainer>
        {isModalOpened && (
          <CreateOrEditBoardModal
            onClose={() => setIsModalOpened(false)}
            onSubmit={handleCreateBoardModalSubmit}
          />
        )}
      </MenuContainer>
    </MenuPage>
  );
};

export default Menu;
