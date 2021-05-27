import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import blockLightboxFoldQuery from 'v2/components/BlockLightbox/components/BlockLightboxMetadataFold/queries/blockLightboxFold'
import blockLightboxConnectionsFragment from 'v2/components/BlockLightbox/components/BlockLightboxConnections/fragments/blockLightboxConnections'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import {
  CompactChannel,
  EmptyCompactChannel,
} from 'v2/components/CompactChannel'
import { LoadMore } from 'v2/components/BlockLightbox/components/BlockLightboxConnections/components/LoadMore'

import Connect from 'v2/components/Connect'
import BlockLightboxChannelsAlsoIn from 'v2/components/BlockLightbox/components/BlockLightboxChannelsAlsoIn'

export default class BlockLightboxConnections extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    block: propType(blockLightboxConnectionsFragment).isRequired,
    onLoadMore: PropTypes.func.isRequired,
    loadingMore: PropTypes.bool.isRequired,
  }

  render() {
    const {
      block,
      block: {
        id,
        current_user_channels,
        private_channels,
        public_channels,
        counts,
        source,
      },
      loading,
      onLoadMore,
      loadingMore,
      ...rest
    } = this.props

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
              Blocks with <span title={source.url}>this URL</span> also appear
              in
            </Text>

            <BlockLightboxChannelsAlsoIn block={block} loading={loading} />
          </React.Fragment>
        )}

        <Connect
          id={id}
          type="BLOCK"
          my={6}
          f={3}
          textAlign="center"
          refetchQueries={[
            {
              query: blockLightboxFoldQuery,
              variables: { id, page: 1, per: 5 },
            },
          ]}
        />
      </Box>
    )
  }
}
