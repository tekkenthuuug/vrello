import React, { useState } from 'react';
import { List, ListItem } from '../../shared-styles/dropdown.styles';
import { StyledDropdownContainer } from './board-dropdown-menu.styles';
import CreateOrEditBoardModal from '../create-or-edit-board-modal/create-or-edit-board-modal';
import { changeBackgroundColor, rename } from '../../redux/board/board.actions';
import useBoardEventsEmmiter from '../../hooks/useBoardEventsEmmiter';
import { useDispatch, useSelector } from 'react-redux';
import { selectInitialBoardEditValues } from '../../redux/board/board.selectors';

const BoardDropdownMenu = ({ onItemClick }) => {
  const boardDispatch = useDispatch();
  const initialBoardEditValues = useSelector(selectInitialBoardEditValues);

  const emitBoardChange = useBoardEventsEmmiter();

  const [isEditModalOpened, setIsEditModalOpened] = useState(false);

  const handleBoardEdit = (
    { name, backgroundColor },
    { setErrors, setSubmitting }
  ) => {
    if (name.length < 1) {
      setErrors({ name: 'Required' });

      setSubmitting(false);
      return;
    }

    if (backgroundColor !== initialBoardEditValues.backgroundColor) {
      const action = changeBackgroundColor(backgroundColor);

      boardDispatch(action);

      emitBoardChange(action);
    }

    if (name !== initialBoardEditValues.name) {
      const action = rename(name);

      boardDispatch(action);

      emitBoardChange(action);
    }

    setIsEditModalOpened(false);
    onItemClick();
  };

  const handleBoardDelete = () => {
    onItemClick();
    emitBoardChange({ type: 'DELETE_BOARD' });
  };

  return (
    <StyledDropdownContainer>
      <List>
        <ListItem onClick={() => setIsEditModalOpened(true)}>
          Edit board
        </ListItem>
        <ListItem onClick={handleBoardDelete}>Delete board</ListItem>
      </List>
      {isEditModalOpened && (
        <CreateOrEditBoardModal
          type='edit'
          onSubmit={handleBoardEdit}
          initialValues={initialBoardEditValues}
          onClose={() => {
            setIsEditModalOpened(false);
            onItemClick();
          }}
        />
      )}
    </StyledDropdownContainer>
  );
};

export default BoardDropdownMenu;
