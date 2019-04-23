import React from 'react';
import styled from 'styled-components';

import Icons from 'v2/components/UI/Icons';

const Container = styled.a.attrs({
  href: '/',
})`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  padding: ${x => x.theme.space[6]};
`;

export default () => (
  <Container>
    <Icons name="X" color="gray.base" />
  </Container>
);
