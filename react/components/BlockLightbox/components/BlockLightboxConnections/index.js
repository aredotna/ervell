import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import blockLightboxConnectionsQuery from 'react/components/BlockLightbox/components/BlockLightboxConnections/queries/blockLightboxConnections';
import blockLightboxConnectionsFragment from 'react/components/BlockLightbox/components/BlockLightboxConnections/fragments/blockLightboxConnections';

import Box from 'react/components/UI/Box';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import CompactChannel, { EmptyCompactChannel } from 'react/components/CompactChannel';
import Connect from 'react/components/Connect';

export default class BlockLightboxConnections extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    block: propType(blockLightboxConnectionsFragment).isRequired,
  }

  render() {
    const { block, loading, ...rest } = this.props;

    return (
      <Box {...rest}>
        {loading &&
          <EmptyCompactChannel>
            <LoadingIndicator f={4} alignItems="center" />
          </EmptyCompactChannel>
        }

        {!loading && block.channels.map(channel => (
          <CompactChannel key={channel.id} channel={channel} mt={3} />
        ))}

        <Connect
          id={block.id}
          type="BLOCK"
          my={6}
          f={3}
          textAlign="center"
          refetchQueries={[{
            query: blockLightboxConnectionsQuery,
            variables: { id: block.id },
          }]}
        />
      </Box>
    );
  }
}
