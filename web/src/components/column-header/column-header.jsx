import React, { createRef, memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { selectColumn } from '../../redux/board/board.selectors';
import {
  ColumnHeaderContainer,
  ColumnName,
  MoreIcon,
} from './column-header.styles';
import ColumnDropdownMenu from '../column-dropdown-menu/column-dropdown-menu';

const ColumnHeader = ({ columnId }) => {
  const { name } = useSelector(selectColumn(columnId));

  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const dropdownContainerRef = createRef();

  const handleHideDropdown = useCallback(() => {
    setIsDropdownOpened(false);
  }, []);

  useOnClickOutside(dropdownContainerRef, handleHideDropdown);

  return (
    <ColumnHeaderContainer>
      <ColumnName>{name}</ColumnName>
      <div ref={dropdownContainerRef}>
        <MoreIcon onClick={() => setIsDropdownOpened(s => !s)} />
        {isDropdownOpened && (
          <ColumnDropdownMenu
            onItemClick={handleHideDropdown}
            columnId={columnId}
          />
        )}
      </div>
    </ColumnHeaderContainer>
  );
};

export default memo(ColumnHeader);
