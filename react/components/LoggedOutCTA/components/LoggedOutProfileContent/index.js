import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import userFragment from 'react/components/LoggedOutCTA/fragments/user';

import { Copy, Button, Container } from 'react/components/LoggedOutCTA/components/UI';


export default class LoggedOutProfileContent extends Component {
  static propTypes = {
    user: propType(userFragment).isRequired,
  }

  render() {
    const { user } = this.props;

    return (
      <Container>
        <Copy>Join Are.na to follow {user.name}</Copy>
        <Button href="/sign_up">Sign Up</Button>
        <Button href="/explore">Explore</Button>
      </Container>
    );
  }
}
