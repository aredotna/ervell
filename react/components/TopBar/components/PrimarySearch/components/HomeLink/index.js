import React from 'react';
import styled from 'styled-components';

import Icons from 'react/components/UI/Icons';

const Container = styled.a`
  box-sizing: border-box;
  display: block;
  position: absolute;
  background-color: white;
  z-index: 1;
  height: 100%;
  width: 2.5em;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: ${props => props.theme.colors.gray.base};
  }

  &:hover {
    svg {
      fill: black;
    }
  }
`;

export default props => (
  <Container href="/" {...props}>
    <Icons
      name="ArenaMark"
      width="100%"
    />
  </Container>
);
