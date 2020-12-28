import React, { useState } from 'react';
import { List, ListItem } from '../../shared-styles/dropdown.styles';
import { StyledDropdownContainer } from './board-dropdown-menu.styles';
import CreateOrEditBoardModal from '../create-or-edit-board-modal/create-or-edit-board-modal';
import useBoardContext from '../../hooks/useBoardContext';

const BoardDropdownMenu = ({ onItemClick }) => {
  const [isEditModalOpened, setIsEditModalOpened] = useState(false);
  const { boardState, handleBoardEdit } = useBoardContext();

  return (
    <StyledDropdownContainer>
      <List>
        <ListItem onClick={() => setIsEditModalOpened(true)}>
          Edit board
        </ListItem>
        <ListItem
          onClick={() => {
            onItemClick();
          }}
        >
          Delete board
        </ListItem>
      </List>
      {isEditModalOpened && (
        <CreateOrEditBoardModal
          type='edit'
          onSubmit={async (values, helpers) => {
            const success = handleBoardEdit(values, helpers);

            if (success) {
              setIsEditModalOpened(false);
              onItemClick();
            }
          }}
          initialValues={{
            name: boardState.name,
            backgroundColor: boardState.backgroundColor,
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
