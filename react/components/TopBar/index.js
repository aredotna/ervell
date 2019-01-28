import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Box from 'react/components/UI/Box';
import PrimarySearch from 'react/components/TopBar/components/PrimarySearch';
import AuthenticationLinks from 'react/components/TopBar/components/AuthenticationLinks';

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  outline: 2px dashed gray;
`;

export default class TopBar extends PureComponent {
  render() {
    return (
      <Container>
        <PrimarySearch flex={1} />

        <AuthenticationLinks px={6} />
      </Container>
    );
  }
}
