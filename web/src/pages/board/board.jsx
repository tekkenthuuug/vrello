import React, { useEffect, useReducer, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import BoardColumn from 'Components/board-column/board-column';
import BoardHeader from 'Components/board-header/board-header';
import { ColumnsContainer, BoardContainer, AddBtn } from './board.styles';
import { boardReducer, initialState } from 'Utils/boardReducer';
import { MdAdd } from 'react-icons/md';

const Board = () => {
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

  const handleItemAdd = (columnId, item) => {
    const action = { type: 'ADD', payload: { to: columnId, item } };

    // send changes to server
    socket.current.emit('board-change', {
      room: id,
      action,
    });
  };

  return (
    <BoardContainer customBg='rgb(0, 121, 191)'>
      <BoardHeader name={name} customBg='rgb(0, 121, 191)' />
      <ColumnsContainer>
        {!isLoading && data ? (
          Object.entries(data).map(([columnKey, columnData]) => (
            <BoardColumn
              key={columnKey}
              columnKey={columnKey}
              columnData={columnData}
              onItemMove={handleItemMove}
              onItemAdd={handleItemAdd}
            />
          ))
        ) : (
          <h1>Loading</h1>
        )}
        <AddBtn>
          <MdAdd />
          Add column
        </AddBtn>
      </ColumnsContainer>
    </BoardContainer>
  );
};

export default Board;
