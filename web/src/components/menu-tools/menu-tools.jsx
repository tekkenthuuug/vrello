import React from 'react';
import {
  LeaveIcon,
  EditIcon,
  UpdateIcon,
  ItemsContainer,
  MenuToolsContainer,
  SelectedCount,
  Spacer,
  ToolsBox,
} from './menu-tools.styles';

const MenuTools = ({
  onEditClick,
  onUpdateClick,
  onDeleteClick,
  selectedBoards,
  isSelectionMode,
  isUpdating,
}) => {
  const selectedBoardCardsCount = Object.keys(selectedBoards).length;

  return (
    <MenuToolsContainer>
      <ToolsBox>
        <ItemsContainer>
          <EditIcon
            onClick={onEditClick}
            isDisabled={isUpdating}
            isHighlighted={isSelectionMode}
          />
          <UpdateIcon onClick={onUpdateClick} isSpinning={isUpdating} />
        </ItemsContainer>
        {isSelectionMode && (
          <ItemsContainer>
            <SelectedCount>
              Selected: <span>{selectedBoardCardsCount}</span>
            </SelectedCount>
            <LeaveIcon
              onClick={onDeleteClick}
              isDisabled={!selectedBoardCardsCount}
            />
          </ItemsContainer>
        )}
      </ToolsBox>
      <Spacer />
    </MenuToolsContainer>
  );
};

export default MenuTools;
