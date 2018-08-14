import React, { Component } from 'react';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import profileMetadataActionsFragment from 'react/components/ProfileMetadata/components/ProfileMetadataActions/fragments/profileMetadataActions';

import { GenericButtonLink, mixin as buttonMixin } from 'react/components/UI/GenericButton';
import FollowButton from 'react/components/FollowButton';
import MessageButton from 'react/components/MessageButton';
import ButtonGroup from 'react/components/UI/ButtonGroup';

const Button = styled(GenericButtonLink)`
`;

const UserFollowButton = styled(FollowButton)`
  ${buttonMixin}
`;

const UserMessageButton = styled(MessageButton)`
  ${buttonMixin}
`;

export default class ProfileMetadataActions extends Component {
  static propTypes = {
    user: propType(profileMetadataActionsFragment).isRequired,
  }

  render() {
    const { user } = this.props;

    // Others
    if (user.can.follow) {
      return (
        <ButtonGroup f={1}>
          <UserMessageButton id={user.id} type="USER" />
          <UserFollowButton id={user.id} type="USER" />
        </ButtonGroup>
      );
    }

    // You
    if (user.can.manage) {
      return (
        <Button href="/settings">
          Settings
        </Button>
      );
    }

    return <div />;
  }
}
