import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Z_INDEXES } from 'react/styles/constants';

import WithLoginStatus from 'react/hocs/WithLoginStatus';
import Box from 'react/components/UI/Box';

const Container = styled(Box).attrs({
  py: 6,
  px: 4,
})`
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 3px solid ${x => x.theme.colors.gray.semiLight};
  text-align: center;
  background: white;
  z-index: ${Z_INDEXES.lightbox}
`;

class LoggedOutCTA extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }

  render() {
    const { children, isLoggedIn } = this.props;

    // This is only for logged out users.
    if (isLoggedIn) { return null; }

    // Eventually switch on content type,
    // for now just show the profile content

    return (
      <Container>
        {children}
      </Container>
    );
  }
}

export default WithLoginStatus(LoggedOutCTA);
