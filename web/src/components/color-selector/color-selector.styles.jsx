import styled from 'styled-components';

export const ColorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ColorItem = styled.div`
  background-color: ${props => props.color};

  width: 28px;
  height: 28px;

  border-radius: 2px;

  margin: 0 4px 4px 0;

  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  cursor: pointer;

  margin-bottom: 1.2em;
`;

export const ColorSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
