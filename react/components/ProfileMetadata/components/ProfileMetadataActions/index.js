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
import Icons from 'react/components/UI/Icons';

const Button = styled(GenericButtonLink)`
`;

const PremiumButton = styled(Button)`
  color: ${x => x.theme.colors.state.premium};
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
          >
            {({ mode }) => (
              <React.Fragment>
                {{
                  resting: 'Start private channel',
                  working: 'Wait...',
                  redirecting: 'Redirecting...',
                  error: 'Error',
                }[mode]}
              </React.Fragment>
            )}
          </UserMessageButton>
        }

        {identifiable.__typename === 'User' && identifiable.can.message &&
          <IdentifiableFollowButton
            id={identifiable.id}
            type={identifiable.__typename.toUpperCase()}
          >
            {({ isFollowed }) => ({
              true: (
                <React.Fragment>
                  <Icons name="Unfollow" size="1rem" mr={4} color="gray.medium" />
                  Unfollow
                </React.Fragment>
              ),
              false: (
                <React.Fragment>
                  <Icons name="Follow" size="1rem" mr={4} color="gray.medium" />
                  Follow
                </React.Fragment>
              ),
            }[isFollowed])}
          </IdentifiableFollowButton>
        }

        {identifiable.__typename === 'User' && identifiable.can.manage &&
          <Button href="/settings">
            <Icons name="Cog" size="1rem" mr={4} color="gray.medium" />
            Settings
          </Button>
        }

        {identifiable.__typename === 'Group' && (identifiable.can.manage || identifiable.can.manage_users) &&
          <Button onClick={this.openManageGroupModal}>
            <Icons name="Pencil" size="1rem" mr={4} color="gray.medium" />
            Edit group
          </Button>
        }

        {identifiable.__typename === 'Group' && (identifiable.can.manage && identifiable.is_upgradeable) &&
          <PremiumButton href="/settings/group_billing">
            <Icons name="Medallion" size="1rem" mr={4} color="state.premium" />
            Upgrade
          </PremiumButton>
        }

        {identifiable.__typename === 'Group' && identifiable.can.follow &&
          <IdentifiableFollowButton
            id={identifiable.id}
            type={identifiable.__typename.toUpperCase()}
          >
            {({ isFollowed }) => ({
              true: 'Unfollow',
              false: 'Follow',
            }[isFollowed])}
          </IdentifiableFollowButton>
        }
      </ButtonGroup>
    );
  }
}
