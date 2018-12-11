import React, { Component } from 'react';
import styled from 'styled-components';

import QuickSearch from 'react/components/QuickSearch';
import NewChannelButton from 'react/components/LoggedInTopBar/components/NewChannelButton';

const Container = styled.div`
  width: 100;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  border: 1px solid black;
`;

const Search = styled(QuickSearch)`
  flex: 1;
`;

export default class TopBar extends Component {
  render() {
    return (
      <Container>
        <Search />
        <NewChannelButton />

      </Container>
    );
  }
}
