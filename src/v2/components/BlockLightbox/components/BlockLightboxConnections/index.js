import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'graphql-anywhere'

import blockLightboxFoldQuery from 'v2/components/BlockLightbox/components/BlockLightboxMetadataFold/queries/blockLightboxFold'
import blockLightboxConnectionsFragment from 'v2/components/BlockLightbox/components/BlockLightboxConnections/fragments/blockLightboxConnections'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import CompactChannel, {
  EmptyCompactChannel,
} from 'v2/components/CompactChannel'
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
      block: { id, private_channels, public_channels, counts, source },
      loading,
      onLoadMore,
      loadingMore,
      ...rest
    } = this.props

    const total = loading ? 0 : private_channels.length + public_channels.length
    const length = loading
      ? 0
      : counts.private_channels + counts.public_channels
    const hasMore = length > total

    return (
      <Box {...rest}>
        {private_channels &&
          private_channels.map(channel => (
            <CompactChannel
              key={`CompactChannelPrivate_${channel.id}`}
              channel={channel}
              mt={3}
            />
          ))}

        {public_channels &&
          public_channels.map(channel => (
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
          <EmptyCompactChannel
            onClick={onLoadMore}
            my={3}
            color="utility.transparent"
          >
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {/* HACK: f={4} non-breaking spaces allow us to match the height perfectly */}
              <Text f={4}>&nbsp;</Text>

              <Text
                f={1}
                color="gray.semiBold"
                textAlign="center"
                textTransform="uppercase"
              >
                Load more
              </Text>

              <Text f={4}>&nbsp;</Text>
            </Box>
          </EmptyCompactChannel>
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
