import React from 'react';
import { ProfileContainer, Username, Email } from './user-dropdown-menu.styles';
import useUserContext from '../../hooks/useUserContext';
import {
  DropdownContainer,
  List,
  ListItem,
} from '../../shared-styles/dropdown.styles';

const UserDropdownMenu = ({ onItemClick }) => {
  const { signOut, user } = useUserContext();

  return (
    <DropdownContainer>
      <ProfileContainer>
        <Username>{user.username}</Username>
        <Email>{user.email}</Email>
      </ProfileContainer>
      <List>
        <ListItem
          onClick={async () => {
            onItemClick();
            await signOut();
          }}
        >
          Sign out
        </ListItem>
      </List>
    </DropdownContainer>
  );
};

export default UserDropdownMenu;
