import React from 'react';
import {
  ColorsContainer,
  ColorItem,
  ColorSelectorContainer,
} from './color-selector.styles';
import { InputLabel } from '../../shared-styles/input.styles';
import { MdDone } from 'react-icons/md';

const ColorSelector = ({ colors, value, onSelect, label }) => {
  return (
    <ColorSelectorContainer>
      <InputLabel>{label}</InputLabel>
      <ColorsContainer>
        {colors.map(color => (
          <ColorItem key={color} color={color} onClick={() => onSelect(color)}>
            {color.toLowerCase() === value.toLowerCase() && <MdDone />}
          </ColorItem>
        ))}
      </ColorsContainer>
    </ColorSelectorContainer>
  );
};

export default ColorSelector;
