import React from 'react';
import styled from 'styled-components';

import { ICON_OFFSET } from 'react/components/UI/SearchInput';
import Icons from 'react/components/UI/Icons';

const Container = styled.a`
  box-sizing: border-box;
  display: block;
  position: absolute;
  z-index: 1;
  height: 100%;
  width: ${ICON_OFFSET};
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
