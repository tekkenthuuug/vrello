import styled from 'styled-components';

export const MeterContainer = styled.div`
  height: 8px;
  width: 100%;
  border-radius: 6px;
  margin-top: 8px;
  background-color: #e8e9ea;
  overflow: hidden;
`;

export const Meter = styled.div`
  transition: all 0.3s ease;

  width: ${props => Math.min(props.width, 100) + '%'};
  height: 100%;
  background-color: rgb(
    100,
    ${props => 55 + Math.min(props.width * 2, 200)},
    0
  );
`;
