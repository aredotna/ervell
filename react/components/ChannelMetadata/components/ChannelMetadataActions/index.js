import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import GenericButton, { mixin as buttonMixin } from 'react/components/UI/GenericButton';
import FollowButton from 'react/components/FollowButton';

import channelMetadataActionsFragment from 'react/components/ChannelMetadata/components/ChannelMetadataActions/fragments/channelMetadataActions';

const Buttons = styled.div`
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

  render() {
    const { channel: { id, can } } = this.props;

    return (
      <Buttons>
        {can.follow &&
          <ChannelFollowButton id={id} type="CHANNEL" />
        }

        {can.mute &&
          <Button>
            Mute
          </Button>
        }

        {can.manage &&
          <Button>
            Edit channel
          </Button>
        }
      </Buttons>
    );
  }
}
