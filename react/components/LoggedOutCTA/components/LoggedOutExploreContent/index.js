import React, { Component } from 'react';
import { Copy, Button, Container, ButtonContainer } from 'react/components/LoggedOutCTA/components/UI';

export default class LoggedOutExploreContent extends Component {
  render() {
    return (
      <Container>
        <Copy>
        Make channels, add content, connect ideas.
        </Copy>
        <ButtonContainer>
          <Button href="/sign_up">Sign Up</Button>
        </ButtonContainer>
      </Container>
    );
  }
}
