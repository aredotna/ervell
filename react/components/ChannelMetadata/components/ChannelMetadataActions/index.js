import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import Modal from 'react/components/UI/Modal';
import ManageChannel from 'react/components/ManageChannel';
import GenericButton, { mixin as buttonMixin } from 'react/components/UI/GenericButton';
import ButtonGroup from 'react/components/UI/ButtonGroup';
import FollowButton from 'react/components/FollowButton';
import MuteChannelButton from 'react/components/ChannelMetadata/components/ChannelMetadataActions/components/MuteChannelButton';

import channelMetadataActionsFragment from 'react/components/ChannelMetadata/components/ChannelMetadataActions/fragments/channelMetadataActions';

const Buttons = styled(ButtonGroup)`
  display: flex;
`;

const Button = styled(GenericButton).attrs({ size: 'xs' })`
`;

const ChannelFollowButton = styled(FollowButton).attrs({ size: 'xs' })`
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
      <Buttons>
        {can.follow &&
          <ChannelFollowButton id={id} type="CHANNEL" />
        }

        {can.mute &&
          <MuteChannelButton channel={channel} />
        }

        {(can.update || can.destroy) &&
          <Button onClick={this.openEditChannel}>
            Edit channel
          </Button>
        }
      </Buttons>
    );
  }
}
