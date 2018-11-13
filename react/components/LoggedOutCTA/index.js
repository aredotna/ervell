import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import userFragment from 'react/components/LoggedOutCTA/fragments/user';

import WithLoginStatus from 'react/hocs/WithLoginStatus';
import LoggedOutProfileContent from 'react/components/LoggedOutCTA/components/LoggedOutProfileContent';
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
`;

class LoggedOutCTA extends Component {
  static propTypes = {
    subject: PropTypes.oneOfType([
      propType(userFragment),
    ]).isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }

  render() {
    const { subject, isLoggedIn } = this.props;

    // This is only for logged out users.
    if (isLoggedIn) { return null; }

    // Eventually switch on content type,
    // for now just show the profile content
    return (
      <Container>
        <LoggedOutProfileContent user={subject} />
      </Container>
    );
  }
}

export default WithLoginStatus(LoggedOutCTA);
