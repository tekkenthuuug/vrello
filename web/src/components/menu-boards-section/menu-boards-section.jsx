import React, { useState } from 'react';
import BoardCard from '../board-card/board-card';
import CreateOrEditBoardModal from '../../components/create-or-edit-board-modal/create-or-edit-board-modal';
import SkeletonBoardCard from '../skeleton-board-card/skeleton-board-card';
import BoardListItem from '../board-list-item/board-list-item';
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
import Duplicator from '../duplicator/duplicator';
import SkeletonBoardListItem from '../skeleton-board-list-item/skeleton-board-list-item';

const MenuBoardsSection = ({
  children,
  label,
  isLoading,
  boards,
  selectedBoards,
  onBoardCardClick,
  isSelectionMode,
  withAddBoard,
  asList,
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

  const BoardComponent = asList ? BoardListItem : BoardCard;
  const SkeletonComponent = asList ? SkeletonBoardListItem : SkeletonBoardCard;

  const boardCards = isLoading ? (
    <Duplicator numberOfDuplicates={3} Component={SkeletonComponent} />
  ) : (
    boards.map(board => {
      const isSelected = !!selectedBoards[board.id];
      return (
        <BoardComponent
          key={board.id}
          board={board}
          isSelected={isSelected}
          onClick={onBoardCardClick}
          grayscale={isSelectionMode && !isSelected}
        />
      );
    })
  );

  return (
    <MenuBoardsContainer>
      <SectionHeading>{label}</SectionHeading>
      <BoardsContainer>
        {boardCards}
        {children}
        {withAddBoard && (
          <CreateBoardBtn
            onClick={() => setIsModalOpened(value => !value)}
            asList={asList}
          >
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
