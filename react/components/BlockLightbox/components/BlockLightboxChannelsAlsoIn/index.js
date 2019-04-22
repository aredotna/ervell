import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import Box from 'react/components/UI/Box';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import CompactChannel, { EmptyCompactChannel } from 'react/components/CompactChannel';

import blockLightboxChannelsAlsoInFragment from 'react/components/BlockLightbox/components/BlockLightboxChannelsAlsoIn/fragments/blockLightboxChannelsAlsoIn';

export default class BlockLightboxChannelsAlsoIn extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    block: propType(blockLightboxChannelsAlsoInFragment).isRequired,
  }

  render() {
    const {
      block: {
        channels_with_same_source,
      },
      loading,
      ...rest
    } = this.props;

    return (
      <Box {...rest}>
        {loading &&
          <EmptyCompactChannel>
            <LoadingIndicator f={4} alignItems="center" />
          </EmptyCompactChannel>
        }

        {channels_with_same_source && channels_with_same_source.map(channel => (
          <CompactChannel
            key={`CompactChannelWithSameSource_${channel.id}`}
            channel={channel}
            mt={3}
          />
        ))}
      </Box>
    );
  }
}
