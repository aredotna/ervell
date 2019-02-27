import React from 'react';
import styled from 'styled-components';

import { translucentGray } from 'react/styles/functions';
import constants from 'react/styles/constants';

import Icon from 'react/components/UI/Icons';
import Box from 'react/components/UI/Box';

const Lock = styled(Icon).attrs({
  name: 'Lock',
  color: 'gray.medium',
  size: '9px',
})``;

const Container = styled(Box)`
  border: 1px solid ${translucentGray('regular')};
  border-radius: ${constants.radii.button};
  padding: ${x => x.theme.space[2]};
  line-height: 0;
`;

const LockWithBorder = ({ ...rest }) => (
  <Container {...rest} >
    <Lock />
  </Container>
);

export default LockWithBorder;
