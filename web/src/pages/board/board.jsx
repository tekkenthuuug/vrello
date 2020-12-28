import BoardColumn from '../../components/board-column/board-column';
import BoardHeader from '../../components/board-header/board-header';
import React, { useState, useRef, useReducer } from 'react';
import { MdAdd } from 'react-icons/md';
import useLiveBoard from '../../hooks/useLiveBoard';
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
  rename,
  changeBackgroundColor,
} from '../../utils/board/board.actions';
import { useParams } from 'react-router-dom';
import { boardReducer, initialState } from '../../utils/board/board.reducer';
import { BoardStateContext } from '../../contexts/boardStateContext';

const Board = () => {
  const { boardId } = useParams();

  const [boardState, boardDispatch] = useReducer(boardReducer, initialState);

  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const dragOverColumnId = useRef(null);

  const { emitBoardChange } = useLiveBoard(boardId, boardDispatch);

  const { columns, name, isLoading } = boardState;

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

  const handleBoardEdit = ({ name, backgroundColor }, { setErrors }) => {
    if (name.length < 1) {
      setErrors({ name: 'Required' });

      return false;
    }

    if (backgroundColor !== boardState.backgroundColor) {
      const action = changeBackgroundColor(backgroundColor);

      boardDispatch(action);

      emitBoardChange(action);
    }

    if (name !== boardState.name) {
      const action = rename(name);

      boardDispatch(action);

      emitBoardChange(action);
    }

    return true;
  };

  if (isLoading && !columns) {
    return <h1>Loading</h1>;
  }

  return (
    <BoardStateContext.Provider value={{ boardState, handleBoardEdit }}>
      <BoardContainer backgroundColor={boardState.backgroundColor}>
        <BoardHeader name={name} />
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
      </BoardContainer>
    </BoardStateContext.Provider>
  );
};

export default Board;
