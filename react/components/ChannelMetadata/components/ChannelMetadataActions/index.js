import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import Modal from 'react/components/UI/Modal';
import Icons from 'react/components/UI/Icons';
import ManageChannel from 'react/components/ManageChannel';
import Button, { mixin as buttonMixin } from 'react/components/UI/GenericButton';
import ButtonGroup from 'react/components/UI/ButtonGroup';
import FollowButton from 'react/components/FollowButton';
import MuteChannelButton from 'react/components/ChannelMetadata/components/ChannelMetadataActions/components/MuteChannelButton';

import channelMetadataActionsFragment from 'react/components/ChannelMetadata/components/ChannelMetadataActions/fragments/channelMetadataActions';

const ChannelFollowButton = styled(FollowButton)`
  ${buttonMixin}
`;

export default class ChannelMetadataActions extends Component {
  static propTypes = {
    channel: propType(channelMetadataActionsFragment).isRequired,
  }

  openEditChannel = () => {
    const { channel: { id } } = this.props;
    const modal = new Modal(ManageChannel, { id });
    modal.open();
  }

  render() {
    const { channel, channel: { id, can } } = this.props;

    return (
      <ButtonGroup f={1}>
        {can.follow &&
          <ChannelFollowButton id={id} type="CHANNEL">
            {({ isFollowed }) => ({
              true: (
                <React.Fragment>
                  <Icons name="Unfollow" mr={3} color="gray.medium" />
                  Unfollow
                </React.Fragment>
              ),
              false: (
                <React.Fragment>
                  <Icons name="Follow" mr={3} color="gray.medium" />
                  Follow
                </React.Fragment>
              ),
            }[isFollowed])}
          </ChannelFollowButton>
        }

        {can.mute &&
          <MuteChannelButton channel={channel} />
        }

        {(can.update || can.destroy) &&
          <Button onClick={this.openEditChannel}>
            <Icons name="Pencil" mr={3} color="gray.medium" />
            Edit channel
          </Button>
        }
      </ButtonGroup>
    );
  }
}
