import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Text from 'react/components/UI/Text';

export default class ProfileEmptyMessage extends Component {
  static propTypes = {
    isMine: PropTypes.bool,
  }

  static defaultProps = {
    isMine: false,
  }

  render() {
    const { isMine } = this.props;

    return (
      <Text f={6} my={8} color="gray.medium" lineHeight={2}>
        No {!isMine && 'public'} content available.<br />
        Try{' '}
        <a href="/explore">explore</a>
        {' '}to view recently edited public channels from other users.
      </Text>
    );
  }
}
