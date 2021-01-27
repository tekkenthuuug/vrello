import { Formik } from 'formik';
import React from 'react';
import { SubmitBtn } from '../../shared-styles/form.styles';
import { BOARD_COLORS } from '../../utils/constants';
import ColorSelector from '../color-selector/color-selector';
import InputField from '../input-field/input-field';
import Modal from '../modal/modal';
import { StyledForm } from './create-or-edit-board-modal.styles';

const createBoardFormInitialState = {
  name: '',
  backgroundColor: BOARD_COLORS[0],
};

const CreateBoardModal = ({
  onSubmit,
  onClose,
  type = 'create',
  initialValues = {},
}) => {
  const actionName = type === 'create' ? 'Create board' : 'Edit board';

  return (
    <Modal name={actionName} onClose={onClose}>
      <Formik
        initialValues={{
          ...createBoardFormInitialState,
          ...initialValues,
        }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setValues, values }) => (
          <StyledForm>
            <InputField
              autoComplete='off'
              autoFocus={type === 'create'}
              name='name'
              placeholder='Enter board name'
              label='Board name'
              disabled={isSubmitting}
            />
            <ColorSelector
              label='Board background'
              value={values.backgroundColor}
              onSelect={backgroundColor =>
                setValues({ ...values, backgroundColor })
              }
            />
            <SubmitBtn type='submit' disabled={isSubmitting}>
              {actionName}
            </SubmitBtn>
          </StyledForm>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateBoardModal;
