import React from 'react'
import styled from 'styled-components'

import { SelectableChannel } from 'v2/components/ConnectionSelectionList/components/SelectableChannel'
import ListButton from 'v2/components/ConnectionSelectionList/components/ListButton'
import { onConnectionSelectionType } from 'v2/components/ConnectionSelectionList'

import { SelectableChannel as Channel } from '__generated__/SelectableChannel'

const Container = styled.div``

interface ChannelsListProps {
  channels: Channel[]
  onConnectionSelection?: onConnectionSelectionType
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
