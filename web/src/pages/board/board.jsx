import React, { useEffect, useReducer, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import BoardColumn from 'Components/board-column/board-column';
import BoardHeader from 'Components/board-header/board-header';
import {
  ColumnsContainer,
  BoardContainer,
  AddBtn,
  StyledElementCreator,
} from './board.styles';
import { boardReducer, initialState } from 'Utils/boardReducer';
import { MdAdd } from 'react-icons/md';

const Board = () => {
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [dragOverColumnId, setDragOverColumnId] = useState(null);

  const socket = useRef(null);

  const [{ data, name, isLoading, id }, dispatch] = useReducer(
    boardReducer,
    initialState
  );

  useEffect(() => {
    socket.current = socketIOClient('http://localhost:5000', {
      transports: ['websocket'],
    });

    socket.current.on('connected', boardData => {
      dispatch({ type: 'INIT', payload: boardData });

      socket.current.emit('join', boardData.id);
    });

    socket.current.on('board-change', action => {
      // handle changes received from server

      dispatch(action);
    });
  }, []);

  const handleItemMove = (from, to, itemId) => {
    const action = { type: 'MOVE', payload: { from, to, itemId } };

    // apply changes locally
    dispatch(action);

    // send changes to server
    socket.current.emit('board-change', {
      room: id,
      action,
    });
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
    socket.current.emit('board-change', {
      room: id,
      action,
    });
  };

  const handleColumnAdd = name => {
    if (!name.length) {
      return;
    }

    const action = {
      type: 'ADD_COLUMN',
      payload: { item: { name } },
    };

    // send changes to server
    socket.current.emit('board-change', {
      room: id,
      action,
    });

    setIsAddingColumn(false);
  };

  const handleItemDelete = (from, itemId) => {
    const action = { type: 'MOVE', payload: { from, to: null, itemId } };

    dispatch(action);

    socket.current.emit('board-change', {
      room: id,
      action,
    });
  };

  const handleColumnDrop = e => {
    e.preventDefault();

    const columnId = e.dataTransfer.getData('id');

    if (!dragOverColumnId || dragOverColumnId === columnId) {
      return;
    }

    const action = {
      type: 'MOVE_COLUMN',
      payload: { columnId, targetColumnId: dragOverColumnId },
    };

    socket.current.emit('board-change', {
      room: id,
      action,
    });

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
            onDrop={handleColumnDrop}
            onDragOver={e => e.preventDefault()}
          >
            {data.map(columnData => (
              <BoardColumn
                key={columnData.id}
                columnId={columnData.id}
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
