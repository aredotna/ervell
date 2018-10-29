import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';

import profileEmptyMessageFragment from 'react/components/ProfileEmptyMessage/fragments/profileEmptyMessage';

import Text from 'react/components/UI/Text';
import ProfileTips from 'react/components/ProfileEmptyMessage/components/ProfileTips';

export default class ProfileEmptyMessage extends Component {
  static propTypes = {
    identifiable: propType(profileEmptyMessageFragment).isRequired,
  }

  render() {
    const { identifiable: { is_me } } = this.props;

    if (is_me) {
      return <ProfileTips />;
    }

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
