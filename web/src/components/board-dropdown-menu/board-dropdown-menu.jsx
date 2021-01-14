import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import useBoardEventsEmitter from '../../hooks/useBoardEventsEmitter';
import { List, ListItem } from '../../shared-styles/dropdown.styles';
import CreateOrEditBoardModal from '../create-or-edit-board-modal/create-or-edit-board-modal';
import { StyledDropdownContainer } from './board-dropdown-menu.styles';
import { changeBackgroundColor, rename } from '../../redux/board/board.actions';
import DeleteBoardModal from '../delete-board-modal/delete-board-modal';
import {
  selectBoardBackgroundColor,
  selectBoardName,
} from '../../redux/board/board.selectors';

const BoardDropdownMenu = ({ onItemClick }) => {
  const dispatch = useDispatch();

  const emitBoardChange = useBoardEventsEmitter();

  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);

  const currentBoardColor = useSelector(selectBoardBackgroundColor);
  const currentBoardName = useSelector(selectBoardName);

  const onEditClick = e => {
    e.stopPropagation();
    setIsEditModalOpened(true);
  };

  const onDeleteClick = e => {
    e.stopPropagation();
    setIsDeleteModalOpened(true);
  };

  const handleBoardEdit = (values, { setErrors, setSubmitting }) => {
    if (values.name.length < 1) {
      setErrors({ name: 'Required' });

      setSubmitting(false);
      return;
    }

    if (values.backgroundColor !== currentBoardColor) {
      const action = changeBackgroundColor(values.backgroundColor);

      dispatch(action);

      emitBoardChange(action);
    }

    if (values.name !== currentBoardName) {
      const action = rename(values.name);

      dispatch(action);

      emitBoardChange(action);
    }

    setIsEditModalOpened(false);
    onItemClick();
  };

  return (
    <StyledDropdownContainer>
      <List onClick={onItemClick}>
        <ListItem onClick={onEditClick}>
          <MdEdit />
          Edit board
        </ListItem>
        <ListItem onClick={onDeleteClick}>
          <MdDelete />
          Delete board
        </ListItem>
      </List>
      {isDeleteModalOpened && (
        <DeleteBoardModal
          onClose={() => {
            setIsEditModalOpened(false);
            onItemClick();
          }}
        />
      )}
      {isEditModalOpened && (
        <CreateOrEditBoardModal
          type='edit'
          onSubmit={handleBoardEdit}
          initialValues={{
            name: currentBoardName,
            backgroundColor: currentBoardColor,
          }}
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
