import React, { useState } from 'react';
import { List, ListItem } from '../../shared-styles/dropdown.styles';
import { StyledDropdownContainer } from './board-dropdown-menu.styles';
import CreateOrEditBoardModal from '../create-or-edit-board-modal/create-or-edit-board-modal';
import { changeBackgroundColor, rename } from '../../redux/board/board.actions';
import useBoardEventsEmmiter from '../../hooks/useBoardEventsEmmiter';
import { useDispatch, useSelector } from 'react-redux';
import { selectInitialBoardEditValues } from '../../redux/board/board.selectors';
import { MdEdit, MdDelete } from 'react-icons/md';

const BoardDropdownMenu = ({ onItemClick }) => {
  const dispatch = useDispatch();
  const initialBoardEditValues = useSelector(selectInitialBoardEditValues);

  const emitBoardChange = useBoardEventsEmmiter();

  const [isEditModalOpened, setIsEditModalOpened] = useState(false);

  const onEditClick = e => {
    e.stopPropagation();
    setIsEditModalOpened(true);
  };

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

      dispatch(action);

      emitBoardChange(action);
    }

    if (name !== initialBoardEditValues.name) {
      const action = rename(name);

      dispatch(action);

      emitBoardChange(action);
    }

    setIsEditModalOpened(false);
    onItemClick();
  };

  const handleBoardDelete = () => {
    emitBoardChange({ type: 'DELETE_BOARD' });
  };

  return (
    <StyledDropdownContainer>
      <List onClick={onItemClick}>
        <ListItem onClick={onEditClick}>
          <MdEdit />
          Edit board
        </ListItem>
        <ListItem onClick={handleBoardDelete}>
          <MdDelete />
          Delete board
        </ListItem>
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
