import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import MuteButton from 'v2/components/MuteButton'
import FollowButton from 'v2/components/FollowButton'
import FullBlockShare from 'v2/components/FullBlock/components/FullBlockShare'

import { FullChannelMetadataActions as FullChannelMetadataActionsType } from '__generated__/FullChannelMetadataActions'

const Container = styled(Box)`
  display: flex;
  justify-content: space-between;
`

const Inner = styled(Box)`
  flex: 1;

  ${props =>
    props.withBorder &&
    `
    border-right: 1px solid ${props.theme.colors.gray.light};
    padding-right: ${props.theme.space[6]};
    margin-right: ${props.theme.space[6]};
  `}

  > a {
    display: channel;
  }
`

const Mute = styled(MuteButton)`
  cursor: pointer;
`

const Follow = styled(FollowButton)`
  cursor: pointer;
`

interface FullChannelActionsProps {
  channel: FullChannelMetadataActionsType
}

export const FullChannelMetadataActions: React.FC<FullChannelActionsProps> = ({
  channel,
}) => {
  if (channel?.__typename !== 'Channel') {
    return null
  }

  return (
    <Container>
      <Inner>
        <Text f={1}>
          <a href={channel.shareable_href}>Open full channel</a>
        </Text>
        <Box>
          {channel?.can.follow && <Follow id={channel?.id} type="CHANNEL" />}
        </Box>
        <Box>
          {channel?.can.mute && <Mute id={channel?.id} type="CHANNEL" />}
        </Box>
        <FullBlockShare connectable={channel} />
      </Inner>
    </Container>
  )
}

export default FullChannelMetadataActions
