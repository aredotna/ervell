import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import Styles from 'react/styles';

import channelMetadataActionsFragment from 'react/components/ChannelMetadata/components/ChannelMetadataActions/fragments/channelMetadataActions';

const Buttons = styled.div`
  display: flex;
`;

const Button = styled.button`
  display: inline-block;
  padding: 0.5em 1em;
  font-weight: bold;
  font-size: ${Styles.Type.size.xs};
  border: 1px solid ${Styles.Colors.gray.medium};
  border-radius: 0.125em;

  &:first-child:not(:last-child) {
    border-radius: 0.125em 0 0 0.125em;
  }

  & + & {
    border-left: 0;
    border-radius: 0 0.125em 0.125em 0;
  }
`;

export default class ChannelMetadataActions extends Component {
  static propTypes = {
    channel: propType(channelMetadataActionsFragment).isRequired,
  }

  render() {
    const { channel: { can } } = this.props;
    return (
      <Buttons>
        {can.follow &&
          <Button>
            Follow
          </Button>
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
