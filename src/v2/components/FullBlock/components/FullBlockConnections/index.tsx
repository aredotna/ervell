import React, { useCallback, useState } from 'react'

import fullBlockFoldQuery from 'v2/components/FullBlock/components/FullBlockMetadataFold/queries/fullBlockFold'
import fullBlockConnectionsQuery from 'v2/components/FullBlock/components/FullBlockConnections/queries/fullBlockConnections'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import {
  CompactChannel,
  EmptyCompactChannel,
} from 'v2/components/CompactChannel'
import { LoadMore } from 'v2/components/FullBlock/components/FullBlockConnections/components/LoadMore'
import Connect from 'v2/components/Connect'

import {
  FullBlockConnectionsQuery,
  FullBlockConnectionsQueryVariables,
} from '__generated__/FullBlockConnectionsQuery'
import { useQuery } from '@apollo/client'
import { BaseConnectableTypeEnum } from '__generated__/globalTypes'
import FullBlockChannelsAlsoIn from 'v2/components/FullBlock/components/FullBlockChannelsAlsoIn'

interface FullBlockConnectionsProps {
  id: string
}

export const FullBlockConnections: React.FC<FullBlockConnectionsProps> = ({
  id,
  ...rest
}) => {
  const { data, loading, fetchMore } = useQuery<
    FullBlockConnectionsQuery,
    FullBlockConnectionsQueryVariables
  >(fullBlockConnectionsQuery, { variables: { id } })

  const [state, setState] = useState({ per: 10, page: 1, loadingMore: false })

  const onLoadMore = useCallback(() => {
    const { page, per } = state

    if (data) {
      setState(prevState => ({
        ...prevState,
        loadingMore: true,
      }))

      fetchMore({
        variables: { page: page + 1, per },
        updateQuery: (prevResult, { fetchMoreResult }) => ({
          block: {
            ...prevResult?.block,
            ...fetchMoreResult?.block,
            private_channels: [
              ...prevResult?.block.private_channels,
              ...fetchMoreResult?.block.private_channels,
            ],
            public_channels: [
              ...prevResult?.block.public_channels,
              ...fetchMoreResult?.block.public_channels,
            ],
          },
        }),
      }).then(({ errors }) => {
        if (errors) return

        setState(prevState => ({
          ...prevState,
          page: page + 1,
          loadingMore: false,
        }))
      })
    }
  }, [fetchMore, state, data])

  const { loadingMore } = state

  if (data?.block.__typename === 'Channel' || !data || !data?.block || loading)
    return null

  const {
    block,
    block: {
      current_user_channels,
      private_channels,
      public_channels,
      counts,
      source,
    },
  } = data

  const total = loading ? 0 : private_channels.length + public_channels.length
  const length = loading
    ? 0
    : counts.private_channels +
      counts.public_channels -
      counts.current_user_channels
  const hasMore = length > total

  const hasCurrentUserChannels =
    current_user_channels && current_user_channels.length > 0
  const currentUserChannelsIds =
    current_user_channels && current_user_channels.map(c => c.id)
  const filteredPrivateChannels =
    private_channels &&
    private_channels.filter(c => !currentUserChannelsIds.includes(c.id))
  const filteredPublicChannels =
    public_channels &&
    public_channels.filter(c => !currentUserChannelsIds.includes(c.id))

  return (
    <Box {...rest}>
      <Connect
        id={id}
        type={BaseConnectableTypeEnum.BLOCK}
        mt={6}
        mb={7}
        f={3}
        textAlign="center"
        refetchQueries={[
          {
            query: fullBlockFoldQuery,
            variables: { id, page: 1, per: 5 },
          },
        ]}
      />

      {hasCurrentUserChannels && (
        <>
          {hasCurrentUserChannels && current_user_channels.length !== total && (
            <Text
              mt={7}
              f={1}
              color="gray.medium"
              textAlign="center"
              textTransform="uppercase"
            >
              Your Connections
            </Text>
          )}
          {current_user_channels.map(channel => (
            <CompactChannel
              key={`CompactChannelYours_${channel.id}`}
              channel={channel}
              mt={3}
            />
          ))}
        </>
      )}

      {hasCurrentUserChannels && current_user_channels.length !== total && (
        <Text
          mt={7}
          f={1}
          color="gray.medium"
          textAlign="center"
          textTransform="uppercase"
        >
          All Connections
        </Text>
      )}

      {filteredPrivateChannels &&
        filteredPrivateChannels.map(channel => (
          <CompactChannel
            key={`CompactChannelPrivate_${channel.id}`}
            channel={channel}
            mt={3}
          />
        ))}

      {filteredPublicChannels &&
        filteredPublicChannels.map(channel => (
          <CompactChannel
            key={`CompactChannelPublic_${channel.id}`}
            channel={channel}
            mt={3}
          />
        ))}

      {(loading || loadingMore) && (
        <EmptyCompactChannel my={3}>
          <LoadingIndicator f={4} alignItems="center" />
        </EmptyCompactChannel>
      )}

      {hasMore && !(loading || loadingMore) && (
        <LoadMore onLoadMore={onLoadMore} />
      )}

      {counts && counts.channels_with_same_source > 0 && (
        <React.Fragment>
          <Text
            mt={7}
            f={1}
            color="gray.medium"
            textAlign="center"
            textTransform="uppercase"
          >
            Blocks with <span title={source.url}>this URL</span> also appear in
          </Text>

          <FullBlockChannelsAlsoIn block={block} loading={loading} />
        </React.Fragment>
      )}
    </Box>
  )
}
