import React, { Component } from 'react';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import profileMetadataActionsFragment from 'react/components/ProfileMetadata/components/ProfileMetadataActions/fragments/profileMetadataActions';

import { GenericButtonLink, mixin as buttonMixin } from 'react/components/UI/GenericButton';
import FollowButton from 'react/components/FollowButton';

const Button = styled(GenericButtonLink).attrs({ size: 'xs' })`
`;

const UserFollowButton = styled(FollowButton).attrs({ size: 'xs' })`
  ${buttonMixin}
`;

export default class ProfileMetadataActions extends Component {
  static propTypes = {
    user: propType(profileMetadataActionsFragment).isRequired,
  }

  render() {
    const { user } = this.props;

    if (user.can.follow) {
      return <UserFollowButton id={user.id} type="USER" />;
    }

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
