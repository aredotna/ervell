import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import profileMetadataFragment from 'react/components/ProfileMetadata/fragments/profileMetadata';
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
`;

export default class LoggedOutCTA extends Component {
  static propTypes = {
    subject: propType(profileMetadataFragment).isRequired,
  }

  render() {
    const { subject } = this.props;

    // Eventually switch on content type,
    // for now just show the profile content
    return (
      <Container>
        <LoggedOutProfileContent user={subject} />
      </Container>
    );
  }
}
