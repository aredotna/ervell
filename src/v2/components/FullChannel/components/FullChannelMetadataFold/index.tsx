import { useQuery } from '@apollo/client'
import React from 'react'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Count from 'v2/components/UI/Count'
import Connect from 'v2/components/Connect'
import { CompactChannel } from 'v2/components/CompactChannel'

import {
  FullChannelMetadataFold as FullChannelMetadataFoldType,
  FullChannelMetadataFoldVariables,
} from '__generated__/FullChannelMetadataFold'
import fullChannelMetadataFold from './queries/fullChannelMetadataFold'

const Header = ({ children: title, ...rest }) => (
  <Box
    mt={6}
    mb={3}
    pb={3}
    borderBottom="1px solid"
    borderColor={'gray.light'}
    flex={1}
    style={{ cursor: 'pointer' }}
    {...rest}
  >
    <Text f={2} color={'gray.medium'}>
      {title}
    </Text>
  </Box>
)

interface FullChannelMetadataFoldProps {
  id: string
}

export const FullChannelMetadataFold: React.FC<FullChannelMetadataFoldProps> = ({
  id,
}) => {
  const { data } = useQuery<
    FullChannelMetadataFoldType,
    FullChannelMetadataFoldVariables
  >(fullChannelMetadataFold, { variables: { id } })

  return (
    <Box>
      <Header mt={4}>
        {data?.channel.counts ? (
          <Count
            amount={data?.channel.counts.connected_to_channels}
            label="Connection"
          />
        ) : (
          'Connections'
        )}
      </Header>
      {data?.channel.connected_to_channels &&
        data?.channel.connected_to_channels.map(channel => {
          return (
            <CompactChannel
              key={`connection-${channel.id}`}
              channel={channel}
              mt={4}
            />
          )
        })}
      <Connect id={id} type="CHANNEL" my={6} f={3} textAlign="center" />
    </Box>
  )
}
