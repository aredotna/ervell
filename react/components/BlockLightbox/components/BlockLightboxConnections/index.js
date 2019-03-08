import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import blockLightboxConnectionsQuery from 'react/components/BlockLightbox/components/BlockLightboxConnections/queries/blockLightboxConnections';

import Box from 'react/components/UI/Box';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import CompactChannel, { EmptyCompactChannel } from 'react/components/CompactChannel';
import Connect from 'react/components/Connect';

export default class BlockLightboxConnections extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  render() {
    const { id, ...rest } = this.props;

    return (
      <Box {...rest}>
        <Query query={blockLightboxConnectionsQuery} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <EmptyCompactChannel>
                  <LoadingIndicator f={4} alignItems="center" />
                </EmptyCompactChannel>
              );
            }

            if (error) {
              return error.message;
            }

            const { block: { channels } } = data;

            return channels.map(channel => (
              <CompactChannel key={channel.id} channel={channel} mt={3} />
            ));
          }}
        </Query>

        <Connect
          id={id}
          type="BLOCK"
          my={6}
          f={3}
          textAlign="center"
          refetchQueries={[{
            query: blockLightboxConnectionsQuery,
            variables: { id },
          }]}
        />
      </Box>
    );
  }
}
