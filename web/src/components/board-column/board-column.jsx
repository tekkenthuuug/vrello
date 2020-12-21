import React, { useState } from 'react';
import {
  ColumnContainer,
  ColumnName,
  ColumnItems,
  AddBtn,
  ColumnContent,
} from './board-column.styles';
import { MdAdd } from 'react-icons/md';
import ColumnCard from 'Components/column-card/column-card';
import ElementCreator from 'Components/element-creator/element-creator';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const BoardColumn = ({
  columnId,
  columnData,
  onItemMove,
  onItemAdd,
  onItemDelete,
  onColumnDragOver,
}) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const elementCreatorRef = React.createRef();

  const handleItemDrop = e => {
    e.preventDefault();
    e.stopPropagation();

    const initialColumnId = e.dataTransfer.getData('from');
    const itemId = e.dataTransfer.getData('id');

    onItemMove(initialColumnId, columnId, itemId);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  useOnClickOutside(elementCreatorRef, () => {
    setIsAddingCard(false);
  });

  const handleColumnDragStart = e => {
    e.dataTransfer.setData('id', columnId);
  };

  return (
    <ColumnContainer
      onDragStart={handleColumnDragStart}
      onDragOver={e => onColumnDragOver(e, columnId)}
      draggable
    >
      <ColumnName>{columnData.name}</ColumnName>
      <ColumnContent>
        <ColumnItems onDrop={handleItemDrop} onDragOver={handleDragOver}>
          {columnData.items.map(item => (
            <ColumnCard
              key={item.id}
              data={item}
              columnId={columnId}
              onDeleteClick={onItemDelete}
              draggable
            />
          ))}
        </ColumnItems>
        {isAddingCard ? (
          <ElementCreator
            asTextArea
            name='description'
            placeholder='Type card description here'
            buttonText='Add card'
            ref={elementCreatorRef}
            onClose={() => setIsAddingCard(false)}
            onSubmit={description => {
              onItemAdd(columnId, description);
              setIsAddingCard(false);
            }}
          />
        ) : (
          <AddBtn onClick={() => setIsAddingCard(true)}>
            <MdAdd />
            Add card
          </AddBtn>
        )}
      </ColumnContent>
    </ColumnContainer>
  );
};

export default BoardColumn;
