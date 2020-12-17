import React from 'react';
import { HeaderContainer } from './board-header.styles';

const BoardHeader = ({ name, customBg }) => {
  return <HeaderContainer customBg={customBg}>{name}</HeaderContainer>;
};

export default BoardHeader;
