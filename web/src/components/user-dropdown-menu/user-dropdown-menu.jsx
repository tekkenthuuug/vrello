import React from 'react';
import { DropdownContainer, List, ListItem } from './user-dropdown-menu.styles';
import useUserContext from 'Hooks/useUserContext';

const UserDropdownMenu = () => {
  const { signOut } = useUserContext();

  return (
    <DropdownContainer>
      <List>
        <ListItem onClick={signOut}>Sign out</ListItem>
      </List>
    </DropdownContainer>
  );
};

export default UserDropdownMenu;
