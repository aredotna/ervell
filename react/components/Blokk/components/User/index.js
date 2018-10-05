import React from 'react';
import styled from 'styled-components';

import Text from 'react/components/UI/Text';
import Connectable from 'react/components/Blokk/components/Connectable';
import UserAvatar from 'react/components/UserAvatar';

const Inner = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 2px solid ${x => x.theme.colors.gray.medium};
  background-color: ${x => x.theme.colors.gray.hint}
`;

const Username = styled(Text)`
  font-weight: bold;
`;

const Spacer = styled.div`
  height: 25%;
`;


export default class User extends Connectable {
  render() {
    const { user } = this.props;

    return (
      <Inner>
        <Username pt={6} mx={3} my={6} f={6} textAlign="center">
          {user.name}
        </Username>
        <UserAvatar user={user} size={120} />
        <Spacer />
      </Inner>
    );
  }
}
