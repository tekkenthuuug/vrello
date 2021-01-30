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
  ListIcon,
  GridIcon,
} from './menu-tools.styles';

const MenuTools = ({
  onEditClick,
  onUpdateClick,
  onDeleteClick,
  selectedBoards,
  isSelectionMode,
  isUpdating,
  displayAsList,
  onChangeViewClick,
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
        <ItemsContainer>
          {isSelectionMode ? (
            <>
              <SelectedCount>
                Selected: <span>{selectedBoardCardsCount}</span>
              </SelectedCount>
              <LeaveIcon
                onClick={onDeleteClick}
                isDisabled={!selectedBoardCardsCount}
              />
            </>
          ) : displayAsList ? (
            <GridIcon onClick={onChangeViewClick} />
          ) : (
            <ListIcon onClick={onChangeViewClick} />
          )}
        </ItemsContainer>
      </ToolsBox>
      <Spacer />
    </MenuToolsContainer>
  );
};

export default MenuTools;
