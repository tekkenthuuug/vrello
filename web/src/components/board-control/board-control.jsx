import React, { useRef, useState, useCallback, useEffect } from 'react';
import { addColumn, moveColumn } from '../../redux/board/board.actions';
import {
  AddBtn,
  ColumnsContainer,
  StyledElementCreator,
} from './board-control.styles';
import { MdAdd } from 'react-icons/md';
import BoardColumn from '../board-column/board-column';
import useBoardEventsEmmiter from '../../hooks/useBoardEventsEmmiter';
import { useDispatch, useSelector } from 'react-redux';
import { selectColumnsIds } from '../../redux/board/board.selectors';

const BoardControl = () => {
  const dispatch = useDispatch();
  const emitBoardChange = useBoardEventsEmmiter();

  const columnsIds = useSelector(selectColumnsIds);

  const [isAddColumnFormVisible, setIsAddColumnFormVisible] = useState(false);
  const dragOverColumnId = useRef(null);

  const handleKeyPress = e => {
    const { target, keyCode, code, altKey, ctrlKey, shiftKey } = e;

    if (target !== document.body || altKey || ctrlKey || shiftKey) {
      return;
    }

    if (keyCode === 99 || code === 'KeyC') {
      e.preventDefault();
      setIsAddColumnFormVisible(true);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleColumnAdd = useCallback(
    ({ text }) => {
      if (!text.length) {
        return;
      }

      const action = addColumn({ name: text });

      // send changes to server
      emitBoardChange(action);

      setIsAddColumnFormVisible(false);
    },
    [emitBoardChange]
  );

  const handleColumnDrop = e => {
    e.preventDefault();

    const columnId = e.dataTransfer.getData('column_id');

    if (
      !columnId ||
      !dragOverColumnId.current ||
      dragOverColumnId.current === columnId
    ) {
      return;
    }

    const action = moveColumn(columnId, dragOverColumnId.current);

    emitBoardChange(action);

    dispatch(action);

    dragOverColumnId.current = null;
  };

  const handleColumnDragOver = (e, columnId) => {
    e.preventDefault();
    e.stopPropagation();

    dragOverColumnId.current = columnId;
  };

  const hideAddColumnForm = useCallback(() => {
    setIsAddColumnFormVisible(false);
  }, []);

  return (
    <ColumnsContainer
      onDrop={handleColumnDrop}
      onDragOver={e => e.preventDefault()}
    >
      {columnsIds.map(columnId => (
        <BoardColumn
          key={columnId}
          columnId={columnId}
          onColumnDragOver={handleColumnDragOver}
        />
      ))}
      {isAddColumnFormVisible ? (
        <StyledElementCreator
          autoFocus
          name='columnName'
          placeholder='Type column name here'
          buttonText='Add column'
          onClose={hideAddColumnForm}
          onSubmit={handleColumnAdd}
          autoComplete='off'
        />
      ) : (
        <AddBtn onClick={() => setIsAddColumnFormVisible(true)}>
          <MdAdd />
          Add column
        </AddBtn>
      )}
    </ColumnsContainer>
  );
};

export default BoardControl;
