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
  const selectedBoardCardsCount = Object.keys(selectedBoards).length;

  return (
    <MenuToolsContainer>
      <ItemsContainer>
        <EditIcon onClick={onEditClick} isHighlighted={isSelectionMode} />
        <UpdateIcon onClick={onUpdateClick} />
      </ItemsContainer>
      {isSelectionMode && (
        <ItemsContainer>
          <SelectedCount>Selected: {selectedBoardCardsCount}</SelectedCount>
          <DeleteIcon
            onClick={onDeleteClick}
            isDisabled={!selectedBoardCardsCount}
          />
        </ItemsContainer>
      )}
    </MenuToolsContainer>
  );
};

export default MenuTools;
