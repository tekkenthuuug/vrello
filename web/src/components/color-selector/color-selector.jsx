import React from 'react';
import {
  ColorsContainer,
  ColorItem,
  ColorSelectorContainer,
} from './color-selector.styles';
import { InputLabel } from '../../shared-styles/input.styles';
import { MdDone } from 'react-icons/md';
import { BOARD_COLORS } from '../../utils/constants';

const ColorSelector = ({
  colors = BOARD_COLORS,
  value = BOARD_COLORS[0],
  onSelect,
  label,
  ...otherProps
}) => {
  return (
    <ColorSelectorContainer {...otherProps}>
      {label && <InputLabel>{label}</InputLabel>}
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
