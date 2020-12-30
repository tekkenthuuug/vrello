import React, { useRef, useState, useCallback } from 'react';
import {
  moveCard,
  addCard,
  addColumn,
  moveColumn,
  deleteCard,
} from '../../redux/board/board.actions';
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
  const boardDispatch = useDispatch();

  const emitBoardChange = useBoardEventsEmmiter();

  const columnsIds = useSelector(selectColumnsIds);

  const [isAddColumnFormVisible, setIsAddColumnFormVisible] = useState(false);
  const dragOverColumnId = useRef(null);

  const handleCardMove = useCallback(
    (from, to, cardId) => {
      const action = moveCard(from, to, cardId);

      // apply changes locally
      boardDispatch(action);

      // send changes to server
      emitBoardChange(action);
    },
    [emitBoardChange, boardDispatch]
  );

  const handleCardAdd = (columnId, description) => {
    if (!description.length) {
      return;
    }

    const action = addCard(columnId, { description });

    // send changes to server
    emitBoardChange(action);
  };

  const handleColumnAdd = useCallback(
    name => {
      if (!name.length) {
        return;
      }

      const action = addColumn({ name });

      // send changes to server
      emitBoardChange(action);

      setIsAddColumnFormVisible(false);
    },
    [emitBoardChange]
  );

  const handleCardDelete = (from, cardId) => {
    const action = deleteCard(from, cardId);

    boardDispatch(action);

    emitBoardChange(action);
  };

  const handleColumnMove = e => {
    e.preventDefault();

    const columnId = e.dataTransfer.getData('id');

    if (!dragOverColumnId.current || dragOverColumnId.current === columnId) {
      return;
    }

    const action = moveColumn(columnId, dragOverColumnId.current);

    emitBoardChange(action);

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
      onDrop={handleColumnMove}
      onDragOver={e => e.preventDefault()}
    >
      {columnsIds.map(columnId => (
        <BoardColumn
          key={columnId}
          columnId={columnId}
          onCardMove={handleCardMove}
          onCardAdd={handleCardAdd}
          onCardDelete={handleCardDelete}
          onColumnDragOver={handleColumnDragOver}
        />
      ))}
      {isAddColumnFormVisible ? (
        <StyledElementCreator
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
