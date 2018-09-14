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
    identifiable: propType(profileMetadataActionsFragment).isRequired,
  }

  render() {
    const { identifiable } = this.props;

    // Others
    if (identifiable.can.follow) {
      return (
        <ButtonGroup f={1}>
          <UserMessageButton id={identifiable.id} type={identifiable.__typename.toUpperCase()} />

          <UserFollowButton id={identifiable.id} type={identifiable.__typename.toUpperCase()} />
        </ButtonGroup>
      );
    }

    // You
    if (identifiable.can.manage) {
      return (
        <Button f={1} href="/settings">
          Settings
        </Button>
      );
    }

    return <div />;
  }
}
