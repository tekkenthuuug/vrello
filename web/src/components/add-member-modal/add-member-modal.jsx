import { Formik } from 'formik';
import React, { useState } from 'react';
import useSuspendedState from '../../hooks/useSuspendedState';
import Modal from '../modal/modal';
import {
  SelectedUserCard,
  StyledForm,
  StyledInputField,
  StyledUserProfileCard,
  UsersDropdown,
  StyledSubmitBtn,
} from './add-member-modal.styles';
import { useSelector } from 'react-redux';
import { selectBoardId } from '../../redux/board/board.selectors';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { InputErrorMessage } from '../../shared-styles/input.styles';
import getUsersByEmail from '../../react-query/queries/getUsersByEmail';
import postAddBoardMember from '../../react-query/mutations/postAddBoardMember';

const AddMemberModal = ({ onClose }) => {
  const boardId = useSelector(selectBoardId);
  const queryClient = useQueryClient();

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserError, setSelectedUserError] = useState('');
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [, setEmailText, suspendedEmailText] = useSuspendedState('', 500);

  const { data: usersData } = useQuery(
    ['users', { email: suspendedEmailText }],
    getUsersByEmail,
    {
      enabled: suspendedEmailText.length > 2,
    }
  );

  const addUserToBoardMutation = useMutation(postAddBoardMember(boardId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['boardMembers', boardId]);
      toast.success(
        <div>
          <strong>{selectedUser.username}</strong> was added to this board
        </div>
      );
      onClose();
    },
    onError: error => {
      setSelectedUserError(error.response.data.message);
      setDropdownOpened(false);
    },
  });

  const handleSubmit = async () => {
    if (!selectedUser) return;

    addUserToBoardMutation.mutate(selectedUser.id);
  };

  return (
    <Modal name='Invite user' onClose={onClose}>
      <Formik initialValues={{ email: '' }} onSubmit={handleSubmit}>
        {({ handleChange, isSubmitting }) => (
          <StyledForm>
            <StyledInputField
              autoComplete='off'
              label='Email'
              placeholder='Enter user email'
              name='email'
              autoFocus
              onFocus={() => setDropdownOpened(true)}
              onChange={async e => {
                handleChange(e);
                setEmailText(e.target.value);
              }}
              disabled={selectedUser}
            >
              {usersData?.data.users.length && dropdownOpened ? (
                <UsersDropdown>
                  {usersData?.data.users.map(user => (
                    <StyledUserProfileCard
                      key={user.id}
                      user={user}
                      onClick={() => {
                        setSelectedUser(user);
                        setDropdownOpened(false);
                      }}
                    />
                  ))}
                </UsersDropdown>
              ) : undefined}
            </StyledInputField>

            <SelectedUserCard
              user={selectedUser}
              withClose
              onClose={() => {
                if (!selectedUser) return;

                setSelectedUserError('');
                setSelectedUser(null);
              }}
              hasError={!!selectedUserError}
            />
            {selectedUserError && (
              <InputErrorMessage>{selectedUserError}</InputErrorMessage>
            )}

            <StyledSubmitBtn
              type='submit'
              disabled={!selectedUser}
              isLoading={isSubmitting}
            >
              Add{selectedUser && ` ${selectedUser.username}`} to board
            </StyledSubmitBtn>
          </StyledForm>
        )}
      </Formik>
    </Modal>
  );
};

export default AddMemberModal;
