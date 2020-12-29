import React, { useRef, useState } from 'react';
import {
  moveCard,
  addCard,
  addColumn,
  moveColumn,
  deleteCard,
} from '../../utils/board/board.actions';
import {
  AddBtn,
  ColumnsContainer,
  StyledElementCreator,
} from './board-control.styles';
import { MdAdd } from 'react-icons/md';
import BoardColumn from '../board-column/board-column';
import useBoardContext from '../../hooks/useBoardContext';

const BoardControl = () => {
  const { boardState, boardDispatch, emitBoardChange } = useBoardContext();

  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const dragOverColumnId = useRef(null);

  const { isLoading, columns } = boardState;

  const handleCardMove = (from, to, cardId) => {
    const action = moveCard(from, to, cardId);

    // apply changes locally
    boardDispatch(action);

    // send changes to server
    emitBoardChange(action);
  };

  const handleCardAdd = (columnId, description) => {
    if (!description.length) {
      return;
    }

    const action = addCard(columnId, { description });

    // send changes to server
    emitBoardChange(action);
  };

  const handleColumnAdd = name => {
    if (!name.length) {
      return;
    }

    const action = addColumn({ name });

    // send changes to server
    emitBoardChange(action);

    setIsAddingColumn(false);
  };

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

  if (isLoading && !columns) {
    return <h1>Loading</h1>;
  }

  return (
    <ColumnsContainer
      onDrop={handleColumnMove}
      onDragOver={e => e.preventDefault()}
    >
      {columns.map(column => (
        <BoardColumn
          key={column.id}
          columnData={column}
          onCardMove={handleCardMove}
          onCardAdd={handleCardAdd}
          onCardDelete={handleCardDelete}
          onColumnDragOver={handleColumnDragOver}
        />
      ))}
      {isAddingColumn ? (
        <StyledElementCreator
          name='columnName'
          placeholder='Type column name here'
          buttonText='Add column'
          onClose={() => setIsAddingColumn(false)}
          onSubmit={handleColumnAdd}
          autoComplete='off'
        />
      ) : (
        <AddBtn onClick={() => setIsAddingColumn(true)}>
          <MdAdd />
          Add column
        </AddBtn>
      )}
    </ColumnsContainer>
  );
};

export default BoardControl;
