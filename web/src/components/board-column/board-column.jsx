import React, { useState } from 'react';
import {
  ColumnContainer,
  ColumnName,
  ColumnItems,
  AddBtn,
} from './board-column.styles';
import { MdAdd } from 'react-icons/md';
import Column from 'Components/column-card/column-card';
import CardCreator from 'Components/card-creator/card-creator';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const BoardColumn = ({ columnKey, columnData, onItemMove, onItemAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  const containerRef = React.createRef();

  const handleDrop = e => {
    const initialColumnId = e.dataTransfer.getData('from');
    const itemId = e.dataTransfer.getData('id');

    onItemMove(initialColumnId, columnKey, itemId);

    e.preventDefault();
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  useOnClickOutside(containerRef, () => {
    setIsAdding(false);
  });

  return (
    <ColumnContainer onDrop={handleDrop} onDragOver={handleDragOver}>
      <ColumnName>{columnData.name}</ColumnName>
      <ColumnItems>
        {columnData.items.map((item, i) => (
          <Column
            key={item.id}
            data={item}
            initialColumn={columnKey}
            draggable={true}
          />
        ))}
        {isAdding ? (
          <CardCreator
            ref={containerRef}
            onClose={() => setIsAdding(false)}
            onSubmit={item => {
              onItemAdd(columnKey, item);
              setIsAdding(false);
            }}
          />
        ) : (
          <AddBtn onClick={() => setIsAdding(true)}>
            <MdAdd />
            Add card
          </AddBtn>
        )}
      </ColumnItems>
    </ColumnContainer>
  );
};

export default BoardColumn;
