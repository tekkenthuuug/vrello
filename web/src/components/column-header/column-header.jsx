import React, {
  createRef,
  memo,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { selectColumn } from '../../redux/board/board.selectors';
import {
  ColumnHeaderContainer,
  ColumnName,
  MoreIcon,
  MoreContainer,
} from './column-header.styles';
import ColumnDropdownMenu from '../column-dropdown-menu/column-dropdown-menu';
import { renameColumn } from '../../redux/board/board.actions';
import useBoardEventsEmitter from '../../hooks/useBoardEventsEmitter';

const ColumnHeader = ({ columnId }) => {
  const dispatch = useDispatch();
  const { emitMemberBoardChange } = useBoardEventsEmitter();

  const { name: columnName } = useSelector(selectColumn(columnId));

  const [columnNameInputText, setColumnNameInputText] = useState(columnName);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [byEnter, setByEnter] = useState(false);

  const dropdownContainerRef = createRef();

  const handleHideDropdown = useCallback(() => {
    setIsDropdownOpened(false);
  }, []);

  useEffect(() => {
    // set when new column name received
    setColumnNameInputText(columnName);
  }, [columnName]);

  const changeColumnName = () => {
    if (columnNameInputText !== columnName) {
      const action = renameColumn(columnId, columnNameInputText);
      dispatch(action);
      emitMemberBoardChange(action);
    }
  };

  const handleNameFieldBlur = () => {
    // if action was called from handleNameFieldKeyPress ignore it
    if (byEnter) {
      setByEnter(false);
      return;
    }

    changeColumnName();
  };

  const handleNameFieldKeyPress = e => {
    const keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      e.preventDefault();
      changeColumnName();
      setByEnter(true);
      setTimeout(() => {
        e.target.blur();
      }, 0);
    }
  };

  useOnClickOutside(dropdownContainerRef, handleHideDropdown);

  return (
    <ColumnHeaderContainer>
      <ColumnName
        value={columnNameInputText}
        onChange={e => setColumnNameInputText(e.target.value)}
        onKeyPress={handleNameFieldKeyPress}
        onBlur={handleNameFieldBlur}
      />
      <MoreContainer
        ref={dropdownContainerRef}
        onClick={() => setIsDropdownOpened(s => !s)}
      >
        <MoreIcon />
        {isDropdownOpened && (
          <ColumnDropdownMenu
            onItemClick={handleHideDropdown}
            columnId={columnId}
          />
        )}
      </MoreContainer>
    </ColumnHeaderContainer>
  );
};

export default memo(ColumnHeader);
