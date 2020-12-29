import React, { useReducer } from 'react';
import { useParams } from 'react-router-dom';
import BoardControl from '../../components/board-control/board-control';
import BoardHeader from '../../components/board-header/board-header';
import { BoardContext } from '../../contexts/boardContext';
import useLiveBoard from '../../hooks/useLiveBoard';
import { changeBackgroundColor, rename } from '../../utils/board/board.actions';
import { boardReducer, initialState } from '../../utils/board/board.reducer';
import { BoardContainer } from './board.styles';

const Board = () => {
  const { boardId } = useParams();

  const [boardState, boardDispatch] = useReducer(boardReducer, initialState);

  const { emitBoardChange } = useLiveBoard(boardId, boardDispatch);

  const { columns, name, isLoading } = boardState;

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
    <BoardContext.Provider
      value={{ boardState, handleBoardEdit, boardDispatch, emitBoardChange }}
    >
      <BoardContainer backgroundColor={boardState.backgroundColor}>
        <BoardHeader name={name} />
        <BoardControl />
      </BoardContainer>
    </BoardContext.Provider>
  );
};

export default Board;
