import React, { useState, useRef } from 'react';
import {
  HeaderContainer,
  RightContainer,
  Navigation,
  LogoContainer,
  SigninLink,
  SignupLink,
  ShortUsernameContainer,
} from './header.styles';
import UserDropdownMenu from 'Components/user-dropdown-menu/user-dropdown-menu';
import useUserContext from 'Hooks/useUserContext';
import useOnClickOutside from 'Hooks/useOnClickOutside';

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
        <div>HOME</div>
        <LogoContainer>Vrello</LogoContainer>
        <RightContainer>
          {user ? (
            <div ref={dropdownRef}>
              <ShortUsernameContainer
                onClick={() => setIsDropdownOpened(s => !s)}
              >
                {user.shortUsername}
              </ShortUsernameContainer>
              {isDropdownOpened && <UserDropdownMenu />}
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
