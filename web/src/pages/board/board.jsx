import BoardColumn from 'Components/board-column/board-column';
import BoardHeader from 'Components/board-header/board-header';
import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import useLiveBoard from '../../hooks/useLiveBoard';
import {
  AddBtn,
  BoardContainer,
  ColumnsContainer,
  StyledElementCreator,
} from './board.styles';

const Board = () => {
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [dragOverColumnId, setDragOverColumnId] = useState(null);

  const { state, dispatch, emitBoardChange } = useLiveBoard();

  const { data, name, isLoading } = state;

  const handleItemMove = (from, to, itemId) => {
    const action = { type: 'MOVE_CARD', payload: { from, to, itemId } };

    // apply changes locally
    dispatch(action);

    // send changes to server
    emitBoardChange(action);
  };

  const handleItemAdd = (columnId, description) => {
    if (!description.length) {
      return;
    }

    const action = {
      type: 'ADD_CARD',
      payload: { to: columnId, item: { description } },
    };

    // send changes to server
    emitBoardChange(action);
  };

  const handleColumnAdd = name => {
    if (!name.length) {
      return;
    }

    const action = {
      type: 'ADD_COLUMN',
      payload: { column: { name } },
    };

    // send changes to server
    emitBoardChange(action);

    setIsAddingColumn(false);
  };

  const handleItemDelete = (from, itemId) => {
    const action = { type: 'MOVE_CARD', payload: { from, to: null, itemId } };

    dispatch(action);

    emitBoardChange(action);
  };

  const handleColumnMove = e => {
    e.preventDefault();

    const columnId = e.dataTransfer.getData('id');

    if (!dragOverColumnId || dragOverColumnId === columnId) {
      return;
    }

    const action = {
      type: 'MOVE_COLUMN',
      payload: { columnId, targetColumnId: dragOverColumnId },
    };

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
      {!isLoading && data ? (
        <>
          <BoardHeader name={name} customBg='rgb(0, 121, 191)' />
          <ColumnsContainer
            onDrop={handleColumnMove}
            onDragOver={e => e.preventDefault()}
          >
            {data.map(columnData => (
              <BoardColumn
                key={columnData.id}
                columnData={columnData}
                onItemMove={handleItemMove}
                onItemAdd={handleItemAdd}
                onItemDelete={handleItemDelete}
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
