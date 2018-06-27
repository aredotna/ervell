import React, { Component } from 'react';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import profileMetadataActionsFragment from 'react/components/ProfileMetadata/components/ProfileMetadataActions/fragments/profileMetadataActions';

import { GenericButtonLink, mixin as buttonMixin } from 'react/components/UI/GenericButton';
import FollowButton from 'react/components/FollowButton';
import MessageButton from 'react/components/MessageButton';
import ButtonGroup from 'react/components/UI/ButtonGroup';

const Buttons = styled(ButtonGroup)`
  display: flex;
`;

const Button = styled(GenericButtonLink).attrs({ f: 1 })`
`;

const UserFollowButton = styled(FollowButton).attrs({ f: 1 })`
  ${buttonMixin}
`;

const UserMessageButton = styled(MessageButton).attrs({ f: 1 })`
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
        <Buttons>
          <UserMessageButton id={user.id} type="USER" />
          <UserFollowButton id={user.id} type="USER" />
        </Buttons>
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
