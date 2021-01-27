import React from 'react';
import {
  DeleteIcon,
  EditIcon,
  UpdateIcon,
  ItemsContainer,
  MenuToolsContainer,
  SelectedCount,
} from './menu-tools.styles';

const MenuTools = ({
  onEditClick,
  onUpdateClick,
  onDeleteClick,
  selectedBoards,
  isSelectionMode,
}) => {
  return (
    <MenuToolsContainer>
      <ItemsContainer>
        <EditIcon onClick={onEditClick} isActive={isSelectionMode} />
        <UpdateIcon onClick={onUpdateClick} />
      </ItemsContainer>
      {isSelectionMode && (
        <ItemsContainer>
          <SelectedCount>
            Selected: {Object.keys(selectedBoards).length}
          </SelectedCount>
          <DeleteIcon onClick={onDeleteClick} />
        </ItemsContainer>
      )}
    </MenuToolsContainer>
  );
};

export default MenuTools;
