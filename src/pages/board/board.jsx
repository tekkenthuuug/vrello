import React, { useReducer } from 'react';
import BoardColumn from 'Components/board-column/board-column';
import BoardHeader from 'Components/board-header/board-header';
import { ColumnsContainer, BoardContainer } from './board.styles';
import { boardReducer, initialState } from 'Utils/boardReducer';

const Board = () => {
  const [{ data, name }, dispatch] = useReducer(boardReducer, initialState);

  return (
    <BoardContainer customBg='rgb(0, 121, 191)'>
      <BoardHeader name={name} customBg='rgb(0, 121, 191)' />
      <ColumnsContainer>
        {Object.entries(data).map(([columnKey, columnData]) => (
          <BoardColumn
            key={columnKey}
            columnKey={columnKey}
            columnData={columnData}
            onItemMove={(from, to, itemId) =>
              dispatch({ type: 'MOVE', payload: { from, to, itemId } })
            }
          />
        ))}
      </ColumnsContainer>
    </BoardContainer>
  );
};

export default Board;
