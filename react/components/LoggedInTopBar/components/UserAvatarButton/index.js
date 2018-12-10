import React, { Component } from 'react';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import UserAvatar from 'react/components/UserAvatar';
import userAvatarFragment from 'react/components/LoggedInTopBar/components/UserAvatarButton/fragments/userAvatar';

const Container = styled.div`
  padding-left: 1em;
  padding-right: 1em;
  display: flex;
  align-items: center;
`;

export default class UserAvatarButton extends Component {
  static propTypes = {
    user: propType(userAvatarFragment).isRequired,
  }
  render() {
    const { user } = this.props;
    return (
      <Container>
        <UserAvatar user={user} />
      </Container>
    );
  }
}
