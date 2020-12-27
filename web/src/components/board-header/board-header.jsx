import React from 'react';
import { HeaderContainer } from './board-header.styles';

const BoardHeader = ({ name }) => {
  return <HeaderContainer>{name}</HeaderContainer>;
};

export default BoardHeader;
