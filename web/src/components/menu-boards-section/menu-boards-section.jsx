import React, { useState } from 'react';
import BoardCard from '../board-card/board-card';
import CreateOrEditBoardModal from '../../components/create-or-edit-board-modal/create-or-edit-board-modal';
import SkeletonBoardCards from '../skeleton-board-cards/skeleton-board-cards';
import {
  BoardsContainer,
  SectionHeading,
  MenuBoardsContainer,
  CreateBoardBtn,
  AddIcon,
} from './menu-boards-section.styles';
import { useMutation, useQueryClient } from 'react-query';
import postUserBoard from '../../react-query/mutations/postUserBoard';
import useUserContext from '../../hooks/useUserContext';
import { useHistory } from 'react-router-dom';

const MenuBoardsSection = ({
  children,
  label,
  isLoading,
  boards,
  selectedBoards,
  onBoardCardClick,
  withAddBoard,
}) => {
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  const history = useHistory();

  const [isModalOpened, setIsModalOpened] = useState(false);

  const userBoardMutation = useMutation(postUserBoard, {
    onSuccess: () => queryClient.invalidateQueries(['boards', user.id]),
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

  const boardCards = isLoading ? (
    <SkeletonBoardCards numberOfCards={3} />
  ) : (
    boards.map(board => (
      <BoardCard
        key={board.id}
        board={board}
        isSelected={selectedBoards[board.id]}
        onClick={onBoardCardClick}
      />
    ))
  );

  return (
    <MenuBoardsContainer>
      <SectionHeading>{label}</SectionHeading>
      <BoardsContainer>
        {boardCards}
        {children}
        {withAddBoard && (
          <CreateBoardBtn onClick={() => setIsModalOpened(value => !value)}>
            <AddIcon />
            Create board
          </CreateBoardBtn>
        )}
      </BoardsContainer>
      {isModalOpened && withAddBoard && (
        <CreateOrEditBoardModal
          onClose={() => setIsModalOpened(false)}
          onSubmit={handleCreateBoardModalSubmit}
        />
      )}
    </MenuBoardsContainer>
  );
};

export default MenuBoardsSection;
