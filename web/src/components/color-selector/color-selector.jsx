import React from 'react';
import { MdDone } from 'react-icons/md';
import { InputLabel } from '../../shared-styles/input.styles';
import { BOARD_COLORS } from '../../utils/constants';
import {
  ColorItem,
  ColorsContainer,
  ColorSelectorContainer,
} from './color-selector.styles';

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
