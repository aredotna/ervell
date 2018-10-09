import React from 'react';
import styled from 'styled-components';

import Text from 'react/components/UI/Text';
import Connectable from 'react/components/Blokk/components/Connectable';
import UserAvatar from 'react/components/UserAvatar';
import FollowButton from 'react/components/FollowButton';

import { mixin as dividerButtonMixin } from 'react/components/UI/Buttons/components/DividerButton';

const Inner = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 2px solid ${x => x.theme.colors.gray.medium};
  background-color: ${x => x.theme.colors.gray.hint};
  padding: ${x => x.theme.space[4]};
  padding-bottom: 0;

  &:hover {
    border: 2px solid ${x => x.theme.colors.gray.semiBold};
  }
`;

const Username = styled(Text)`
  font-weight: bold;
  margin-bottom: ${x => x.theme.space[1]};
`;


const UserFollowButton = styled(FollowButton)`
  ${dividerButtonMixin}
  width: ${x => x.theme.space[10]};
  padding: ${x => x.theme.space[6]};
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
        <UserFollowButton
          key="follow"
          f={4}
          id={user.id}
          type="USER"
        />
      </Inner>
    );
  }
}
