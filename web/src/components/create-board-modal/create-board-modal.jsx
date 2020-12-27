import React from 'react';
import Modal from '../modal/modal';
import InputField from '../input-field/input-field';
import ColorSelector from '../color-selector/color-selector';
import { Formik } from 'formik';
import { StyledForm } from './create-board-modal.styles';
import { SubmitBtn } from '../../shared-styles/form.styles';
import useFetch from '../../hooks/useFetch';
import { API_ROUTES, BOARD_COLORS } from '../../utils/constants';
import { useHistory } from 'react-router-dom';

const CreateBoardFormInitialState = {
  name: '',
  backgroundColor: BOARD_COLORS[0],
};

const CreateBoardModal = ({ onClose }) => {
  const history = useHistory();

  const [createBoard] = useFetch(API_ROUTES.board.create(), { method: 'POST' });

  const handleSubmit = async (values, { setErrors }) => {
    const response = await createBoard(values);

    if (response.success) {
      const { board } = response.data;
      onClose();
      history.push(`/app/board/${board.id}`);
    } else {
      setErrors(response.error);
    }
  };

  return (
    <Modal name='Create board' onClose={onClose}>
      <Formik
        initialValues={CreateBoardFormInitialState}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setValues, values }) => (
          <StyledForm>
            <InputField
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
              Create board
            </SubmitBtn>
          </StyledForm>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateBoardModal;
