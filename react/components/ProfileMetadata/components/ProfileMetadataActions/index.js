import React, { Component } from 'react';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import profileMetadataActionsFragment from 'react/components/ProfileMetadata/components/ProfileMetadataActions/fragments/profileMetadataActions';

import { GenericButtonLink, mixin as buttonMixin } from 'react/components/UI/GenericButton';
import FollowButton from 'react/components/FollowButton';
import MessageButton from 'react/components/MessageButton';
import ButtonGroup from 'react/components/UI/ButtonGroup';

import Modal from 'react/components/UI/Modal';
import ManageGroup from 'react/components/ManageGroup';

const Button = styled(GenericButtonLink)`
`;

const IdentifiableFollowButton = styled(FollowButton)`
  ${buttonMixin}
`;

const UserMessageButton = styled(MessageButton)`
  ${buttonMixin}
`;

export default class ProfileMetadataActions extends Component {
  static propTypes = {
    identifiable: propType(profileMetadataActionsFragment).isRequired,
  }

  openManageGroupModal = (e) => {
    e.preventDefault();

    const { identifiable: { id } } = this.props;

    new Modal(ManageGroup, {
      id,
      onSuccess: (res) => {
        const { data: { update_group: { group: { href } } } } = res;
        // Slug may have changed so redirect
        window.location = href;
      },
    }).open();
  }

  render() {
    const { identifiable } = this.props;

    return (
      <ButtonGroup f={1}>
        {identifiable.__typename === 'User' && identifiable.can.follow &&
          <UserMessageButton
            id={identifiable.id}
            type={identifiable.__typename.toUpperCase()}
            title={`Clicking this creates a collaborative channel between you and ${identifiable.name}`}
          />
        }

        {identifiable.__typename === 'User' && identifiable.can.message &&
          <IdentifiableFollowButton
            id={identifiable.id}
            type={identifiable.__typename.toUpperCase()}
          />
        }

        {identifiable.__typename === 'User' && identifiable.can.manage &&
          <Button href="/settings">
            Settings
          </Button>
        }

        {identifiable.__typename === 'Group' && (identifiable.can.manage || identifiable.can.manage_users) &&
          <Button onClick={this.openManageGroupModal}>
            Edit group
          </Button>
        }

        {identifiable.__typename === 'Group' && identifiable.can.follow &&
          <IdentifiableFollowButton
            id={identifiable.id}
            type={identifiable.__typename.toUpperCase()}
          />
        }
      </ButtonGroup>
    );
  }
}
