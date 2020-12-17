import React from 'react';
import {
  ColumnContainer,
  ColumnName,
  ColumnItems,
  AddButton,
} from './board-column.styles';
import { MdAdd } from 'react-icons/md';
import Column from 'Components/column-card/column-card';

const BoardColumn = ({ columnKey, columnData, onItemMove }) => {
  const handleDrop = e => {
    const initialColumnId = e.dataTransfer.getData('from');
    const itemId = e.dataTransfer.getData('id');

    onItemMove(initialColumnId, columnKey, itemId);

    e.preventDefault();
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  return (
    <ColumnContainer onDrop={handleDrop} onDragOver={handleDragOver}>
      <ColumnName>{columnData.name}</ColumnName>
      <ColumnItems>
        {columnData.items.map(item => (
          <Column
            key={item.id}
            data={item}
            initialColumn={columnKey}
            draggable={true}
          />
        ))}
        <AddButton>
          <MdAdd />
          Add card
        </AddButton>
      </ColumnItems>
    </ColumnContainer>
  );
};

export default BoardColumn;
