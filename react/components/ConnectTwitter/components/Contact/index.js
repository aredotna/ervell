import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled, { css } from 'styled-components';

import UserAvatar from 'react/components/UserAvatar';
import Text from 'react/components/UI/Text';
import FollowButton from 'react/components/FollowButton';

import contactAvatarFragment from 'react/components/ConnectTwitter/components/Contact/fragments/index';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 3px 0;
  border-bottom: 1px solid ${x => x.theme.colors.gray.light};
`;

const Identifier = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Username = styled(Text)`
  display: flex;
  align-self: center;
`;

const followMixin = css`
  font-family: ${x => x.theme.fonts.sans};
  justify-self: flex-end;
  font-weight: bold;
  color: ${x => x.theme.colors.gray.medium};
  cursor: pointer;

  &:hover {
    color: ${x => x.theme.colors.gray.bold};
  }
`;

const FollowText = styled.span`
  ${followMixin}
  color: ${x => x.theme.colors.gray.semiBold};
  &:after {
    content: 'Follow';
  }
`;

const UnfollowText = styled.span`
  ${followMixin}
  &:after {
    content: 'Unfollow';
  }
`;

export default class Contact extends Component {
  static propTypes = {
    user: propType(contactAvatarFragment).isRequired,
  }

  render() {
    const { user } = this.props;

    return (
      <Container>
        <Identifier>
          <UserAvatar user={user} mr={5} />
          <Username>{user.name}</Username>
        </Identifier>
        <FollowButton
          id={user.id}
          type="USER"
          followNode={<FollowText />}
          unfollowNode={<UnfollowText />}
        />
      </Container>
    );
  }
}
