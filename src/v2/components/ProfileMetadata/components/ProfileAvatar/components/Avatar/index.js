import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'v2/components/UI/Box';
import AvatarBox from 'v2/components/UI/Avatar';

const AvatarContainer = styled(AvatarBox)`
  width: auto;
  height: auto;
  max-width: 140px;
  max-height: 140px;
  background-color: white;
`;

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
      <Box>
        <AvatarContainer size={140} mx="auto" tag="span">
          {children}

          <img src={avatar} alt="avatar" />
        </AvatarContainer>
      </Box>
    );
  }
}
