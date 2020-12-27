import styled from 'styled-components';

export const BoardCardOverlay = styled.div`
  position: absolute;
  display: none;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.07);
`;

export const BoardName = styled.div`
  font-weight: 800;
  font-size: 18px;
  color: #fff;
`;

export const BoardCardContainer = styled.div`
  position: relative;

  background-color: ${props => props.backgroundColor};

  height: 90px;
  width: 190px;
  border-radius: 4px;

  padding: 8px 12px;
  margin: 0 12px 12px 0;

  &:hover {
    ${BoardCardOverlay} {
      display: block;
    }
  }
`;
