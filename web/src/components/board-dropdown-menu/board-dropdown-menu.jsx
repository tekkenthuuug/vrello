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
import { deleteBoard } from '../../redux/board/board.actions';
import DeleteBoardModal from '../delete-board-modal/delete-board-modal';

const BoardDropdownMenu = ({ onItemClick }) => {
  const dispatch = useDispatch();

  const initialName = useSelector(selectBoardName);
  const initialColor = useSelector(selectBoardBackgroundColor);

  const emitBoardChange = useBoardEventsEmmiter();

  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);

  const onEditClick = e => {
    e.stopPropagation();
    setIsEditModalOpened(true);
  };

  const onDeleteClick = e => {
    e.stopPropagation();
    setIsDeleteModalOpened(true);
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
    const action = deleteBoard();

    emitBoardChange(action);

    dispatch(action);
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
          boardName={initialName}
          onSubmit={handleBoardDelete}
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
