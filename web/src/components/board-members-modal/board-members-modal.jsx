import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import getBoardMembers from '../../react-query/queries/getBoardMembers';
import {
  selectBoardBackgroundColor,
  selectBoardId,
} from '../../redux/board/board.selectors';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import Modal from '../modal/modal';
import UserProfileCard from '../user-profile-card/user-profile-card';
import { MembersContainer } from './board-members-modal.styles';
import deleteBoardMember from '../../react-query/mutations/deleteBoardMember';
import removeMemberFromBoardMembersCache from '../../react-query/updaters/removeMemberFromBoardMembersCache';

const BoardMembersModal = ({ onClose }) => {
  const queryClient = useQueryClient();

  const boardId = useSelector(selectBoardId);
  const boardBackgroundColor = useSelector(selectBoardBackgroundColor);

  const boardMembersQueryKey = ['boardMembers', boardId];
  const { data: boardMembersData, isLoading } = useQuery(
    boardMembersQueryKey,
    getBoardMembers
  );

  const deleteBoardMemberMutation = useMutation(deleteBoardMember(boardId), {
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        boardMembersQueryKey,
        removeMemberFromBoardMembersCache(variables)
      );
    },
  });

  const members = boardMembersData?.data?.members;

  return (
    <Modal name='Board members' onClose={onClose}>
      <MembersContainer>
        {isLoading ? (
          <LoadingSpinner color={boardBackgroundColor} />
        ) : members.length ? (
          members.map(member => (
            <UserProfileCard
              user={member}
              key={member.id}
              withClose
              onClose={() => deleteBoardMemberMutation.mutate(member.id)}
            />
          ))
        ) : (
          <div>Can't find any board members :(</div>
        )}
      </MembersContainer>
    </Modal>
  );
};

export default BoardMembersModal;
