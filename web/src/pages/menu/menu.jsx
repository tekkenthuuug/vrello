import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import BoardCard from '../../components/board-card/board-card';
import CreateOrEditBoardModal from '../../components/create-or-edit-board-modal/create-or-edit-board-modal';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import useUserContext from '../../hooks/useUserContext';
import postUserBoard from '../../react-query/mutations/postUserBoard';
import getUserBoards from '../../react-query/queries/getUserBoards';
import {
  AddIcon,
  BoardsContainer,
  CreateBoardBtn,
  MenuContainer,
  MenuPage,
  SectionHeading,
} from './menu.styles';

const Menu = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { user } = useUserContext();

  const queryKey = ['boards', user.id];

  const { data: boardsData, isLoading: isLoadingBoards } = useQuery(
    queryKey,
    getUserBoards,
    {
      staleTime: 60000,
    }
  );

  const userBoardMutation = useMutation(postUserBoard, {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
  });

  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleCreateBoardModalSubmit = async (values, { setErrors }) => {
    const response = await userBoardMutation.mutateAsync(values);

    if (response.success) {
      const { board } = response.data;
      setIsModalOpened(false);

      history.push(`/app/${board.creator.slug}/${board.slug}`);
    } else {
      setErrors(response.error);
    }
  };

  if (isLoadingBoards) {
    return <LoadingScreen />;
  }

  const { boards, memberBoards } = boardsData.data;

  return (
    <MenuPage>
      <MenuContainer>
        <SectionHeading>Your boards</SectionHeading>
        <BoardsContainer>
          {boards.map(board => (
            <BoardCard key={board.id} board={board} userSlug={user.slug} />
          ))}
          <CreateBoardBtn onClick={() => setIsModalOpened(s => !s)}>
            <AddIcon />
            Create board
          </CreateBoardBtn>
        </BoardsContainer>
        {memberBoards.length ? (
          <>
            <SectionHeading>Boards you are member in</SectionHeading>
            <BoardsContainer>
              {memberBoards.map(board => (
                <BoardCard key={board.id} board={board} />
              ))}
            </BoardsContainer>
          </>
        ) : undefined}
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
