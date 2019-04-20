import React from 'react';
import styled from 'styled-components';

import Icon from 'v2/components/UI/Icons';
import Box from 'v2/components/UI/Box';

// TODO: All this should be configurable if we need a similar style of icon
const Lock = styled(Icon).attrs({
  name: 'Lock',
  color: 'gray.medium',
  size: '0.625rem',
})`
`;

const Container = styled(Box).attrs({
  border: '1px solid',
  borderColor: 'gray.regular',
})`
  display: inline-flex;
  border-radius: 0.25rem;
  padding: 0.1875rem;
  line-height: 0;
`;

const BorderedLock = ({ ...rest }) => (
  <Container {...rest} >
    <Lock />
  </Container>
);

export default BorderedLock;
