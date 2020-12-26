import React, { useState, useRef } from 'react';
import {
  HeaderContainer,
  RightContainer,
  Navigation,
  LogoContainer,
  SigninLink,
  SignupLink,
  ShortUsernameContainer,
  NavigationList,
  ListItem,
} from './header.styles';
import UserDropdownMenu from '../user-dropdown-menu/user-dropdown-menu';
import useUserContext from '../../hooks/useUserContext';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const { user } = useUserContext();
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => {
    setIsDropdownOpened(false);
  });

  return (
    <HeaderContainer>
      <Navigation>
        <NavigationList>
          {user && (
            <ListItem>
              <Link to='/app'>Home</Link>
            </ListItem>
          )}
        </NavigationList>
        <LogoContainer>Vrello</LogoContainer>
        <RightContainer>
          {user ? (
            <div ref={dropdownRef}>
              <ShortUsernameContainer
                onClick={() => setIsDropdownOpened(s => !s)}
              >
                {user.shortUsername}
              </ShortUsernameContainer>
              {isDropdownOpened && (
                <UserDropdownMenu
                  onItemClick={() => setIsDropdownOpened(false)}
                />
              )}
            </div>
          ) : (
            <>
              <SigninLink to='/signin'>Log in</SigninLink>
              <SignupLink to='/signup'>Sign up</SignupLink>
            </>
          )}
        </RightContainer>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;