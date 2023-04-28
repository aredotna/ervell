import React from 'react'
import styled from 'styled-components'

import { KonnectableChannel as KonnectableChannelData } from '__generated__/KonnectableChannel'

import { channelVisibilityForegroundColor } from 'v2/styles/mixins'

import constants from 'v2/styles/constants'

import Text from 'v2/components/UI/Text'
import Count from 'v2/components/UI/Count'
import Badge from 'v2/components/UI/Badge'
import BorderedLock from 'v2/components/UI/BorderedLock'
import { unescape } from 'lodash'

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 2px solid;
  border-radius: ${constants.radii.subtle};

  &,
  ${Text} {
    ${channelVisibilityForegroundColor}
  }
`

interface Props {
  channel: KonnectableChannelData
}

export const KonnectableChannel: React.FC<Props> = ({ channel, ...rest }) => (
  <Container visibility={channel.visibility} {...rest}>
    <Text f={6} mx={4} pt={6} breakWord textAlign="center">
      <span>{unescape(channel.truncatedTitle)}</span>

      {channel.visibility === 'private' && (
        <BorderedLock ml={3} position="relative" top="-0.125rem" />
      )}
    </Text>

    <Text my={4} f={2} textAlign="center">
      by {channel.owner.name}
      {channel.owner.__typename === 'Group' && (
        <Badge
          f={0}
          ml={4}
          color={`channel.${channel.visibility.toLowerCase()}`}
          icon={{ private: 'Lock' }[channel.owner.visibility]}
        >
          Group
        </Badge>
      )}
      <br />
      <Count label="block" amount={channel.counts.contents} />
      {' • '}
      {channel.updated_at}
    </Text>
  </Container>
)

export default KonnectableChannel
