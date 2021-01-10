import React from 'react';
import Modal from '../modal/modal';
import InputField from '../input-field/input-field';
import { Formik } from 'formik';
import { StyledForm, Description } from './delete-board-modal.styles';
import { SubmitBtn } from '../../shared-styles/form.styles';

const DeleteBoardModal = ({ boardName, onClose, onSubmit }) => {
  return (
    <Modal name='Delete board' onClose={onClose}>
      <Formik initialValues={{ name: '' }} onSubmit={onSubmit}>
        {({ isSubmitting, values }) => (
          <StyledForm>
            <Description>
              Please type <span>{boardName}</span> to confirm delete action
            </Description>
            <InputField
              autoComplete='off'
              name='name'
              disabled={isSubmitting}
            />

            <SubmitBtn
              type='submit'
              disabled={isSubmitting || values.name !== boardName}
            >
              Delete {boardName}
            </SubmitBtn>
          </StyledForm>
        )}
      </Formik>
    </Modal>
  );
};

export default DeleteBoardModal;
