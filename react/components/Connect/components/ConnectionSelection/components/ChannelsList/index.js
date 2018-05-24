import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import selectableChannelFragment from 'react/components/Connect/components/ConnectionSelection/components/SelectableChannel/fragments/selectableChannel';

import SelectableChannel from 'react/components/Connect/components/ConnectionSelection/components/SelectableChannel';
import ListButton from 'react/components/Connect/components/ConnectionSelection/components/ListButton';

const Container = styled.div`
`;

export default class ChannelsList extends Component {
  static propTypes = {
    channels: PropTypes.arrayOf(propType(selectableChannelFragment)).isRequired,
    onConnectionSelection: PropTypes.func.isRequired,
  }

  render() {
    const { channels, onConnectionSelection, ...rest } = this.props;

    return (
      <Container {...rest}>
        {channels.length === 0 &&
          <ListButton disabled>
            Nothing yet.
          </ListButton>
        }

        {channels.map(channel => (
          <SelectableChannel
            key={channel.id}
            channel={channel}
            onSelection={onConnectionSelection}
          />
        ))}
      </Container>
    );
  }
}
