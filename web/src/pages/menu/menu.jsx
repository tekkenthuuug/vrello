import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import BoardCard from '../../components/board-card/board-card';
import SkeletonBoardCards from '../../components/skeleton-board-cards/skeleton-board-cards';
import CreateOrEditBoardModal from '../../components/create-or-edit-board-modal/create-or-edit-board-modal';
import useUserContext from '../../hooks/useUserContext';
import postUserBoard from '../../react-query/mutations/postUserBoard';
import getUserBoards from '../../react-query/queries/getUserBoards';
import {
  AddIcon,
  BoardsContainer,
  CreateBoardBtn,
  MenuContainer,
  MenuPage,
  UpdateIcon,
  Section,
  SectionHeader,
} from './menu.styles';

const Menu = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { user } = useUserContext();

  const queryKey = ['boards', user.id];

  const {
    data: boardsData,
    isLoading: isLoadingBoards,
    refetch: refetchBoards,
  } = useQuery(queryKey, getUserBoards);

  const userBoardMutation = useMutation(postUserBoard, {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
  });

  const [isModalOpened, setIsModalOpened] = useState(false);

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

  let boardCards, boardMemberCards;

  if (isLoadingBoards) {
    boardCards = <SkeletonBoardCards numberOfCards={3} />;
    boardMemberCards = <SkeletonBoardCards numberOfCards={2} />;
  } else {
    const { boards, memberBoards } = boardsData.data;
    boardCards = boards.map(board => (
      <BoardCard key={board.id} board={board} fallbackSlug={user.slug} />
    ));
    boardMemberCards = memberBoards.map(board => (
      <BoardCard key={board.id} board={board} />
    ));
  }

  return (
    <MenuPage>
      <MenuContainer>
        <Section>
          <SectionHeader>
            <h1>Boards you own</h1>
            <UpdateIcon onClick={refetchBoards} />
          </SectionHeader>
          <BoardsContainer>
            {boardCards}
            <CreateBoardBtn onClick={() => setIsModalOpened(s => !s)}>
              <AddIcon />
              Create board
            </CreateBoardBtn>
          </BoardsContainer>
        </Section>
        <Section>
          <SectionHeader>
            <h1>Boards you are member in</h1>
          </SectionHeader>
          <BoardsContainer>{boardMemberCards}</BoardsContainer>
        </Section>
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
