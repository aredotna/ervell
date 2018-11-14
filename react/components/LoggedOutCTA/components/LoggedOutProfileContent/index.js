import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import userFragment from 'react/components/LoggedOutCTA/fragments/user';

import { Copy, Button, Container, ButtonContainer } from 'react/components/LoggedOutCTA/components/UI';
import Truncate from 'react/components/UI/Truncate';

export default class LoggedOutProfileContent extends Component {
  static propTypes = {
    user: propType(userFragment).isRequired,
  }

  render() {
    const { user } = this.props;

    return (
      <Container>
        <Copy>
          Join Are.na to follow <Truncate length={40}>{user.name}</Truncate>
        </Copy>
        <ButtonContainer>
          <Button href="/sign_up">Sign Up</Button>
          <Button href="/explore">Explore</Button>
        </ButtonContainer>
      </Container>
    );
  }
}
