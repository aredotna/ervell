import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'graphql-anywhere'
import styled from 'styled-components'

import selectableChannelFragment from 'v2/components/ConnectionSelectionList/components/SelectableChannel/fragments/selectableChannel'

import SelectableChannel from 'v2/components/ConnectionSelectionList/components/SelectableChannel'
import ListButton from 'v2/components/ConnectionSelectionList/components/ListButton'

const Container = styled.div``

export default class ChannelsList extends Component {
  static propTypes = {
    channels: PropTypes.arrayOf(propType(selectableChannelFragment)),
    onConnectionSelection: PropTypes.func.isRequired,
  }

  static defaultProps = {
    channels: [],
  }

  render() {
    const { channels, onConnectionSelection, ...rest } = this.props

    return (
      <Container {...rest}>
        {channels.length === 0 && (
          <ListButton disabled>Nothing yet.</ListButton>
        )}

        {channels.map(channel => (
          <SelectableChannel
            key={channel.id}
            channel={channel}
            onSelection={onConnectionSelection}
          />
        ))}
      </Container>
    )
  }
}
