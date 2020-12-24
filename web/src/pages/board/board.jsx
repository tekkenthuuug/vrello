import BoardColumn from 'Components/board-column/board-column';
import BoardHeader from 'Components/board-header/board-header';
import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import useLiveBoard from 'Hooks/useLiveBoard';
import {
  AddBtn,
  BoardContainer,
  ColumnsContainer,
  StyledElementCreator,
} from './board.styles';
import {
  moveCard,
  addCard,
  addColumn,
  moveColumn,
  deleteCard,
} from 'Utils/board/board.actions';

const Board = () => {
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [dragOverColumnId, setDragOverColumnId] = useState(null);

  const { state, dispatch, emitBoardChange } = useLiveBoard();

  const { columns, name, isLoading } = state;

  const handleCardMove = (from, to, cardId) => {
    const action = moveCard(from, to, cardId);

    // apply changes locally
    dispatch(action);

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

    dispatch(action);

    emitBoardChange(action);
  };

  const handleColumnMove = e => {
    e.preventDefault();

    const columnId = e.dataTransfer.getData('id');

    if (!dragOverColumnId || dragOverColumnId === columnId) {
      return;
    }

    const action = moveColumn(columnId, dragOverColumnId);

    emitBoardChange(action);

    setDragOverColumnId(null);
  };

  const handleColumnDragOver = (e, columnId) => {
    e.preventDefault();
    e.stopPropagation();

    setDragOverColumnId(columnId);
  };

  return (
    <BoardContainer customBg='rgb(0, 121, 191)'>
      {!isLoading && columns ? (
        <>
          <BoardHeader name={name} customBg='rgb(0, 121, 191)' />
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
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </BoardContainer>
  );
};

export default Board;
