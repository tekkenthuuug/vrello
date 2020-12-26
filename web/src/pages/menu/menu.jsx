import React, { useState } from 'react';
import { MenuPageContainer } from './menu.styles';
import { CreateBoardBtn } from './menu.styles';
import CreateBoardModal from '../../components/create-board-modal/create-board-modal';

const Menu = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <MenuPageContainer>
      {/* <Link to={`${match.url}/board/${1}`}>Click me</Link> */}
      <CreateBoardBtn onClick={() => setIsModalOpened(s => !s)}>
        Create board
      </CreateBoardBtn>
      {isModalOpened && (
        <CreateBoardModal onClose={() => setIsModalOpened(false)} />
      )}
    </MenuPageContainer>
  );
};

export default Menu;
