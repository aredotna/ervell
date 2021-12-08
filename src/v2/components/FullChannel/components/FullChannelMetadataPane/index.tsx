import { useQuery } from '@apollo/client'
import React from 'react'

import { MetadataContainer } from 'v2/components/FullBlockLayout'
import Text from 'v2/components/UI/Text'
import Header from 'v2/components/FullBlock/components/FullBlockMetadataPane/components/Header'

import fullChannelMetadataPaneQuery from './queries/fullChannelMetadataPane'
import {
  FullChannelMetadata,
  FullChannelMetadataVariables,
} from '__generated__/FullChannelMetadata'
import Box from 'v2/components/UI/Box'
import FullChannelMetadataActions from '../FullChannelMetadataActions'
import { FullChannelMetadataFold } from '../FullChannelMetadataFold'
import { ToggleConnectionExpanded } from 'v2/components/ToggleConnectionExpanded'
import { ChannelTableContentsSet_channel_blokks_Channel_connection } from '__generated__/ChannelTableContentsSet'

interface FullChannelMetadataPaneProps {
  id: string
  connection?: ChannelTableContentsSet_channel_blokks_Channel_connection
}

export const FullChannelMetadataPane: React.FC<FullChannelMetadataPaneProps> = ({
  id,
  connection,
}) => {
  const { data } = useQuery<FullChannelMetadata, FullChannelMetadataVariables>(
    fullChannelMetadataPaneQuery,
    { variables: { id } }
  )

  return (
    <MetadataContainer>
      {data?.channel?.description && (
        <Box mb={6}>
          <Text
            f={2}
            lineHeight={2}
            dangerouslySetInnerHTML={{ __html: data?.channel?.description }}
            breakWord
            boldLinks
            hoverLinks={{ color: 'gray.bold' }}
          />
        </Box>
      )}

      <Box mb={8}>
        <Text f={1} lineHeight={2} color="gray.medium">
          by{` `}
          <a href={data?.channel?.user.href}>
            <strong>{data?.channel?.user.name}</strong>
          </a>
          {data?.channel?.created_at !== data?.channel?.updated_at && (
            <React.Fragment>
              <br />

              <time
                dateTime={data?.channel?.updated_at_timestamp}
                title={data?.channel?.updated_at_timestamp}
              >
                Last updated {data?.channel?.updated_at}
              </time>
            </React.Fragment>
          )}
        </Text>
      </Box>

      <Header mt={4} mb={4}>
        Actions
      </Header>

      <Text my={6} f={1} fontWeight="bold" lineHeight={2}>
        {connection && <ToggleConnectionExpanded connection={connection} />}

        <FullChannelMetadataActions channel={data?.channel} />
      </Text>

      {data?.channel.id && (
        <FullChannelMetadataFold id={data?.channel.id.toString()} />
      )}
    </MetadataContainer>
  )
}
