import React from 'react'
import styled from 'styled-components'

import { SelectableChannel } from 'v2/components/ConnectionSelectionList/components/SelectableChannel'
import ListButton from 'v2/components/ConnectionSelectionList/components/ListButton'

import { SelectableChannel as Channel } from '__generated__/SelectableChannel'

const Container = styled.div``

interface ChannelsListProps {
  channels: Channel[]
  onConnectionSelection?: (isSelected: boolean, channel: Channel) => void
}

export const ChannelsList: React.FC<ChannelsListProps> = ({
  channels,
  onConnectionSelection,
  ...rest
}) => {
  return (
    <Container {...rest}>
      {channels.length === 0 && <ListButton disabled>Nothing yet.</ListButton>}

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
