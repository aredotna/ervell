import React from 'react'

import { ChannelEmptyMessage_owner as ChannelEmptyMessageOwnerData } from '__generated__/ChannelEmptyMessage'

import Box, { BoxProps } from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

interface Props extends BoxProps {
  channelOwner: ChannelEmptyMessageOwnerData
}

export const ChannelEmptyMessage: React.FC<Props> = ({
  channelOwner,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Text f={6} lineHeight={2} color="gray.medium" boldLinks>
        Nothing here yet…
        <br />
        Go to {channelOwner.name}’s <a href={channelOwner.href}>profile</a> or{' '}
        <a href="/explore">explore</a> recent public channels from other users
      </Text>
    </Box>
  )
}
