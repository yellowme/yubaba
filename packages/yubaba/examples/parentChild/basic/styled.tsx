import styled from 'styled-components';

export const Card = styled.li`
  display: block;
  height: 100px;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: #ccc;
  }
`;

export const Screen = styled.main`
  height: 100%;
  box-shadow: 0 1px 40px rgba(32, 33, 36, 0.15);
  cursor: pointer;
  background-color: #ccc;
`;
