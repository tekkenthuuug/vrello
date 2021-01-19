import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import useSuspendedState from '../../hooks/useSuspendedState';
import { SubmitBtn } from '../../shared-styles/form.styles';
import { API_ROUTES } from '../../utils/constants';
import Modal from '../modal/modal';
import {
  SelectedUserCard,
  StyledForm,
  StyledInputField,
  StyledUserProfileCard,
  UsersDropdown,
} from './add-member-modal.styles';
import { useSelector } from 'react-redux';
import { selectBoardId } from '../../redux/board/board.selectors';

const AddMemberModal = ({ onClose }) => {
  const boardId = useSelector(selectBoardId);

  const [selectedUser, setSelectedUser] = useState(null);
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [, setEmailText, suspendedEmailText] = useSuspendedState('', 500);

  const [fetchUsers, { response }] = useFetch(
    API_ROUTES.user.search(suspendedEmailText),
    {
      method: 'GET',
    }
  );

  const [addUserToBoard] = useFetch(API_ROUTES.board.addMember(boardId), {
    method: 'POST',
    body: { userId: selectedUser?.id },
  });

  const handleSubmit = async () => {
    const response = await addUserToBoard();

    if (response.success) {
      onClose();
    }
  };

  useEffect(() => {
    if (suspendedEmailText.length < 3) {
      return;
    }
    (async () => {
      await fetchUsers();
    })();
    // eslint-disable-next-line
  }, [suspendedEmailText]);

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
              onFocus={() => setDropdownOpened(true)}
              onChange={async e => {
                handleChange(e);
                setEmailText(e.target.value);
              }}
              disabled={selectedUser}
            >
              {response?.data.users.length && dropdownOpened ? (
                <UsersDropdown>
                  {response?.data.users.map(user => (
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

            {selectedUser && (
              <SelectedUserCard
                user={selectedUser}
                withClose
                onClose={() => setSelectedUser(null)}
              />
            )}

            <SubmitBtn
              type='submit'
              disabled={!selectedUser}
              isLoading={isSubmitting}
            >
              Add{selectedUser && ` ${selectedUser.username}`} to board
            </SubmitBtn>
          </StyledForm>
        )}
      </Formik>
    </Modal>
  );
};

export default AddMemberModal;
