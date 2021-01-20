import React from 'react';
import { ShortUsernameContainer } from '../../shared-styles/user.styles';
import {
  ProfileCardContainer,
  Username,
  Email,
  InfoContainer,
  CloseIcon,
} from './user-profile-card.styles';

const UserProfileCard = ({ user, withClose, onClose, ...otherProps }) => {
  return (
    <ProfileCardContainer {...otherProps}>
      <ShortUsernameContainer>{user?.shortUsername}</ShortUsernameContainer>
      <InfoContainer>
        <Username>{user?.username}</Username>
        <Email>{user?.email}</Email>
      </InfoContainer>
      {withClose && <CloseIcon onClick={onClose} />}
    </ProfileCardContainer>
  );
};

export default UserProfileCard;
