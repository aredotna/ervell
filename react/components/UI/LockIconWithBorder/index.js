import React from 'react';
import styled from 'styled-components';

import { translucentGray } from 'react/styles/functions';

import Icon from 'react/components/UI/Icons';
import Box from 'react/components/UI/Box';

// TODO: All this should be configurable if we need a similar style of icon
const Lock = styled(Icon).attrs({
  name: 'Lock',
  color: 'gray.medium',
  size: '10px',
})`
`;

const Container = styled(Box)`
  border: 1px solid ${translucentGray('regular')} !important;
  border-radius: 0.25rem;
  padding: 3px;
  line-height: 0;
`;

const LockWithBorder = ({ ...rest }) => (
  <Container {...rest} >
    <Lock />
  </Container>
);

export default LockWithBorder;
