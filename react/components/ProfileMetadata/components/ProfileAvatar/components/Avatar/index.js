import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Box from 'react/components/UI/Box';
import AvatarBox from 'react/components/UI/Avatar';

export default class Avatar extends Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    const { avatar, children } = this.props;

    return (
      <Box mt={-6} mb={6}>
        <AvatarBox size={140} mx="auto" tag="span">
          {children}

          <img src={avatar} alt="avatar" />
        </AvatarBox>
      </Box>
    );
  }
}
