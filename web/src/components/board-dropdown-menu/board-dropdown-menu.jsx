import React, { useState } from 'react';
import { MdDelete, MdEdit, MdGroup } from 'react-icons/md';
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
import BoardMembersModal from '../board-members-modal/board-members-modal';

const BoardDropdownMenu = ({ onItemClick }) => {
  const dispatch = useDispatch();

  const { emitAdminBoardChange } = useBoardEventsEmitter();

  const [selectedModal, setSelectedModal] = useState(null);

  const currentBoardColor = useSelector(selectBoardBackgroundColor);
  const currentBoardName = useSelector(selectBoardName);

  const onEditClick = e => {
    e.stopPropagation();
    setSelectedModal('edit');
  };

  const onDeleteClick = e => {
    e.stopPropagation();
    setSelectedModal('delete');
  };

  const onBoardMembersClick = e => {
    e.stopPropagation();
    setSelectedModal('members');
  };

  const handleBoardEdit = async (values, { setErrors }) => {
    if (values.name.length < 1) {
      setErrors({ name: 'Required' });

      return;
    }

    if (values.backgroundColor !== currentBoardColor) {
      const action = changeBackgroundColor(values.backgroundColor);

      dispatch(action);

      emitAdminBoardChange(action);
    }

    if (values.name !== currentBoardName) {
      const action = rename(values.name);

      dispatch(action);

      emitAdminBoardChange(action);
    }

    setSelectedModal(null);
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
        <ListItem onClick={onBoardMembersClick}>
          <MdGroup />
          Board members
        </ListItem>
      </List>
      {selectedModal === 'edit' ? (
        <CreateOrEditBoardModal
          type='edit'
          onSubmit={handleBoardEdit}
          initialValues={{
            name: currentBoardName,
            backgroundColor: currentBoardColor,
          }}
          onClose={() => {
            setSelectedModal(null);
            onItemClick();
          }}
        />
      ) : selectedModal === 'delete' ? (
        <DeleteBoardModal
          onClose={() => {
            setSelectedModal(null);
            onItemClick();
          }}
        />
      ) : selectedModal === 'members' ? (
        <BoardMembersModal
          onClose={() => {
            setSelectedModal(null);
            onItemClick();
          }}
        />
      ) : undefined}
    </StyledDropdownContainer>
  );
};

export default BoardDropdownMenu;
