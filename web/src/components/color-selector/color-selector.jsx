import React from 'react';
import { ColorsContainer, ColorItem } from './color-selector.styles';
import { InputLabel } from '../../shared-styles/input.styles';
import { MdDone } from 'react-icons/md';

const ColorSelector = ({ colors, value, onSelect, label }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <InputLabel>{label}</InputLabel>
      <ColorsContainer>
        {colors.map(color => (
          <ColorItem key={color} color={color} onClick={() => onSelect(color)}>
            {color === value && <MdDone />}
          </ColorItem>
        ))}
      </ColorsContainer>
    </div>
  );
};

export default ColorSelector;
