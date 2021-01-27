import React from 'react';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import useBoardEventsEmitter from '../../hooks/useBoardEventsEmitter';
import { moveColumn } from '../../redux/board/board.actions';
import { List, ListItem } from '../../shared-styles/dropdown.styles';
import { StyledDropdownContainer } from './column-dropdown-menu.styles';

const ColumnDropdownMenu = ({ onItemClick, columnId }) => {
  const dispatch = useDispatch();
  const { emitMemberBoardChange } = useBoardEventsEmitter();

  const handleDeleteColumn = () => {
    const action = moveColumn(columnId);

    dispatch(action);

    emitMemberBoardChange(action);
  };

  return (
    <StyledDropdownContainer>
      <List onClick={onItemClick}>
        <ListItem onClick={handleDeleteColumn}>
          <MdDelete />
          Delete column
        </ListItem>
      </List>
    </StyledDropdownContainer>
  );
};

export default ColumnDropdownMenu;
