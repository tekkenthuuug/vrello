import React from 'react';
import useUserContext from '../../hooks/useUserContext';
import {
  DropdownContainer,
  List,
  ListItem,
} from '../../shared-styles/dropdown.styles';
import UserProfileCard from '../user-profile-card/user-profile-card';

const UserDropdownMenu = ({ onItemClick }) => {
  const { signOut, user } = useUserContext();

  return (
    <DropdownContainer>
      <UserProfileCard user={user} />
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
