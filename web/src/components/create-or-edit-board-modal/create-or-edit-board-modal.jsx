import React from 'react';
import Modal from '../modal/modal';
import InputField from '../input-field/input-field';
import ColorSelector from '../color-selector/color-selector';
import { Formik } from 'formik';
import { StyledForm } from './create-or-edit-board-modal.styles';
import { SubmitBtn } from '../../shared-styles/form.styles';
import { BOARD_COLORS } from '../../utils/constants';

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
        initialValues={{ ...createBoardFormInitialState, ...initialValues }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setValues, values }) => (
          <StyledForm>
            <InputField
              autoComplete='off'
              name='name'
              placeholder='Enter board name'
              label='Board name'
              disabled={isSubmitting}
            />
            <ColorSelector
              label='Board background'
              colors={BOARD_COLORS}
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