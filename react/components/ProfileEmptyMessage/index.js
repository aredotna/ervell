import React, { Component } from 'react';

import Text from 'react/components/UI/Text';

export default class ProfileEmptyMessage extends Component {
  render() {
    return (
      <Text f={6} my={8} color="gray.medium" lineHeight={2}>
        No public content available.<br />
        Try{' '}
        <a href="/explore">explore</a>
        {' '}to view recently edited public channels from other users.
      </Text>
    );
  }
}
