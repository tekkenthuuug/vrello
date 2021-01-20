import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import getBoardMembers from '../../react-query/queries/getBoardMembers';
import { selectBoardId } from '../../redux/board/board.selectors';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import Modal from '../modal/modal';
import UserProfileCard from '../user-profile-card/user-profile-card';
import { MembersContainer } from './board-members-modal.styles';
import deleteBoardMember from '../../react-query/mutations/deleteBoardMember';

const BoardMembersModal = ({ onClose }) => {
  const queryClient = useQueryClient();

  const boardId = useSelector(selectBoardId);

  const { data: boardMembersData, isLoading } = useQuery(
    ['boardMembers', boardId],
    getBoardMembers
  );

  const deleteBoardMemberMutation = useMutation(deleteBoardMember(boardId), {
    onSuccess: (_, variables) => {
      queryClient.setQueryData(['boardMembers', boardId], old => {
        old.data.members = old.data.members.filter(
          member => member.id !== variables
        );
        return old;
      });
    },
  });

  const members = boardMembersData?.data?.members;

  return (
    <Modal name='Board members' onClose={onClose}>
      <MembersContainer>
        {isLoading ? (
          <LoadingSpinner color='#0079bf' />
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
