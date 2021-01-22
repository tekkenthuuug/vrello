import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SubmitBtn } from '../../shared-styles/form.styles';
import { FlexCenterCenterCss } from '../../shared-styles/util.styles';

export const NoBoardAccessContainer = styled.div`
  width: 100%;
  height: 100vh;
  ${FlexCenterCenterCss}

  & > svg {
    height: 400px;
  }
`;

export const MessageContainer = styled.div`
  margin-right: 40px;
  display: flex;
  height: 220px;
  display: flex;
  flex-direction: column;
`;

export const OptionsContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RequestAccessBtn = styled(SubmitBtn)`
  font-size: 20px;
`;

export const Separator = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  margin: 12px 0;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.4);
`;

export const HomeLink = styled(Link)`
  text-transform: uppercase;
  color: rgb(0, 128, 128);
  font-weight: bold;
  background-color: rgba(0, 128, 128, 0.2);
  padding: 8px 18px;
  font-family: 14px;
  border-radius: 4px;

  transition: color, background-color 0.3s ease;

  &:hover {
    color: rgba(255, 255, 255, 1);
    background-color: rgba(0, 128, 128, 0.8);
    text-decoration: none;
  }
`;
