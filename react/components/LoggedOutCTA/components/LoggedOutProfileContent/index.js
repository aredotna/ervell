import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Copy, Button, Container } from 'react/components/LoggedOutCTA/components/UI';


export default class LoggedOutProfileContent extends Component {
  static propTypes = {
    user: PropTypes.node.isRequired,
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
