import ColumnCard from 'Components/column-card/column-card';
import ElementCreator from 'Components/element-creator/element-creator';
import React, { memo, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import {
  AddBtn,
  ColumnContainer,
  ColumnContent,
  ColumnItems,
  ColumnName,
} from './board-column.styles';

const BoardColumn = ({
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

    onItemMove(initialColumnId, columnData.id, itemId);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  useOnClickOutside(elementCreatorRef, () => {
    setIsAddingCard(false);
  });

  const handleColumnDragStart = e => {
    e.dataTransfer.setData('id', columnData.id);
  };

  return (
    <ColumnContainer
      onDragStart={handleColumnDragStart}
      onDragOver={e => onColumnDragOver(e, columnData.id)}
      draggable
    >
      <ColumnName>{columnData.name}</ColumnName>
      <ColumnContent>
        <ColumnItems onDrop={handleItemDrop} onDragOver={handleDragOver}>
          {columnData.items.map(item => (
            <ColumnCard
              key={item.id}
              data={item}
              columnId={columnData.id}
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
              onItemAdd(columnData.id, description);
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

export default memo(BoardColumn);
