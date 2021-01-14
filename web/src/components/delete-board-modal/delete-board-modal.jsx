import React from 'react';
import Modal from '../modal/modal';
import InputField from '../input-field/input-field';
import { Formik } from 'formik';
import { StyledForm, Description } from './delete-board-modal.styles';
import { SubmitBtn } from '../../shared-styles/form.styles';
import { selectBoardName } from '../../redux/board/board.selectors';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBoard } from '../../redux/board/board.actions';
import useBoardEventsEmmiter from '../../hooks/useBoardEventsEmmiter';

const DeleteBoardModal = ({ onClose }) => {
  const currentBoardName = useSelector(selectBoardName);

  const dispatch = useDispatch();

  const emitBoardChange = useBoardEventsEmmiter();

  const handleBoardDelete = () => {
    const action = deleteBoard();

    emitBoardChange(action);

    dispatch(action);
  };

  return (
    <Modal name='Delete board' onClose={onClose}>
      <Formik initialValues={{ name: '' }} onSubmit={handleBoardDelete}>
        {({ isSubmitting, values }) => (
          <StyledForm>
            <Description>
              Please type <span>{currentBoardName}</span> to confirm delete
              action
            </Description>
            <InputField
              autoComplete='off'
              name='name'
              disabled={isSubmitting}
            />

            <SubmitBtn
              type='submit'
              disabled={isSubmitting || values.name !== currentBoardName}
            >
              Delete {currentBoardName}
            </SubmitBtn>
          </StyledForm>
        )}
      </Formik>
    </Modal>
  );
};

export default DeleteBoardModal;