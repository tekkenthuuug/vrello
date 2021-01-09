import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import useBoardEventsEmmiter from '../../hooks/useBoardEventsEmmiter';
import { changeBackgroundColor, rename } from '../../redux/board/board.actions';
import {
  selectBoardBackgroundColor,
  selectBoardName,
} from '../../redux/board/board.selectors';
import { List, ListItem } from '../../shared-styles/dropdown.styles';
import CreateOrEditBoardModal from '../create-or-edit-board-modal/create-or-edit-board-modal';
import { StyledDropdownContainer } from './board-dropdown-menu.styles';

const BoardDropdownMenu = ({ onItemClick }) => {
  const dispatch = useDispatch();

  const initialName = useSelector(selectBoardName);
  const initialColor = useSelector(selectBoardBackgroundColor);

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

    if (backgroundColor !== initialColor) {
      const action = changeBackgroundColor(backgroundColor);

      dispatch(action);

      emitBoardChange(action);
    }

    if (name !== initialName) {
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
          initialValues={{ name: initialName, backgroundColor: initialColor }}
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
