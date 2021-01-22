import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { FlexCenterCenterCss } from '../../shared-styles/util.styles';

export const HeaderContainer = styled.header`
  position: relative;
  height: 40px;
  background-color: ${props => props.boardColor || '#026aa7'};
  color: white;

  padding: 0 12px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 10;
`;

export const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  & > * {
    flex: 1;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  position: relative;
`;

export const LogoContainer = styled.div`
  ${FlexCenterCenterCss}
`;

const buttonsCss = css`
  height: 30px;
  padding: 0 12px;
  ${FlexCenterCenterCss}
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    text-decoration: none;
  }
`;

export const SigninLink = styled(Link)`
  ${buttonsCss}
  margin-left: 4px;
  background-color: #ffffff33;
  &:hover {
    background-color: #ffffff1a;
  }
`;

export const SignupLink = styled(Link)`
  ${buttonsCss}
  background-color: #61bd4f;
  &:hover {
    background-color: #519839;
  }
`;

export const NavigationList = styled.ul`
  display: flex;
  list-style: none;
  font-weight: bold;
`;

export const ListItem = styled.li`
  text-transform: uppercase;

  a {
    &:hover {
      text-decoration: none;
    }
  }
`;
