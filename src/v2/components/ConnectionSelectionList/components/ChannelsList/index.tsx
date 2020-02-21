import React from 'react'
import styled from 'styled-components'

import { SelectableChannel } from 'v2/components/ConnectionSelectionList/components/SelectableChannel'
import ListButton from 'v2/components/ConnectionSelectionList/components/ListButton'
import { OnConnectionSelectionType } from 'v2/components/ConnectionSelectionList'

import { SelectableChannel as Channel } from '__generated__/SelectableChannel'

const Container = styled.div``

interface ChannelsListProps {
  channels: Channel[]
  onConnectionSelection?: OnConnectionSelectionType
  selectedChannels?: Channel[]
}

export const ChannelsList: React.FC<ChannelsListProps> = ({
  channels,
  onConnectionSelection,
  selectedChannels = [],
  ...rest
}) => {
  return (
    <Container {...rest}>
      {channels.length === 0 && <ListButton disabled>Nothing yet.</ListButton>}

      {channels.map(channel => {
        const isSelected = selectedChannels.find(c => c.id === channel.id)

        return (
          <SelectableChannel
            isSelected={!!isSelected}
            key={channel.id}
            channel={channel}
            onSelection={onConnectionSelection}
          />
        )
      })}
    </Container>
  )
}
