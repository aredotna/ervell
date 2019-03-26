import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import blockLightboxFoldQuery from 'react/components/BlockLightbox/components/BlockLightboxMetadataFold/queries/blockLightboxFold';
import blockLightboxConnectionsFragment from 'react/components/BlockLightbox/components/BlockLightboxConnections/fragments/blockLightboxConnections';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import CompactChannel, { EmptyCompactChannel } from 'react/components/CompactChannel';
import Connect from 'react/components/Connect';

export default class BlockLightboxConnections extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    block: propType(blockLightboxConnectionsFragment).isRequired,
    onLoadMore: PropTypes.func.isRequired,
    loadingMore: PropTypes.bool.isRequired,
  }

  render() {
    const {
      block: {
        id,
        private_channels,
        public_channels,
        counts,
        source,
      },
      loading,
      onLoadMore,
      loadingMore,
      ...rest
    } = this.props;

    const total = loading ? 0 : (private_channels.length + public_channels.length);
    const length = loading ? 0 : (counts.private_channels + counts.public_channels);
    const hasMore = length > total;

    return (
      <Box {...rest}>
        {private_channels && private_channels.map(channel => (
          <CompactChannel key={channel.id} channel={channel} mt={3} />
        ))}

        {public_channels && public_channels.map(channel => (
          <CompactChannel key={channel.id} channel={channel} mt={3} />
        ))}

        {(loading || loadingMore) &&
          <EmptyCompactChannel my={3}>
            <LoadingIndicator f={4} alignItems="center" />
          </EmptyCompactChannel>
        }

        {hasMore && !(loading || loadingMore) &&
          <EmptyCompactChannel onClick={onLoadMore} my={3} color="utility.transparent">
            <Box width="100%" display="flex" alignItems="center" justifyContent="center">
              {/* HACK: f={4} non-breaking spaces allow us to match the height perfectly */}
              <Text f={4}>&nbsp;</Text>

              <Text f={1} color="gray.base" textAlign="center" textTransform="uppercase">
                Load more
              </Text>

              <Text f={4}>&nbsp;</Text>
            </Box>
          </EmptyCompactChannel>
        }

        <Connect
          id={id}
          type="BLOCK"
          my={6}
          f={3}
          textAlign="center"
          refetchQueries={[{
            query: blockLightboxFoldQuery,
            variables: { id, page: 1, per: 5 },
          }]}
        />
      </Box>
    );
  }
}
