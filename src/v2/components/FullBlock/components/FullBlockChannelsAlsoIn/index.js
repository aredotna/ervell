import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import Box from 'v2/components/UI/Box'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import {
  CompactChannel,
  EmptyCompactChannel,
} from 'v2/components/CompactChannel'

import fullBlockChannelsAlsoInFragment from 'v2/components/FullBlock/components/FullBlockChannelsAlsoIn/fragments/fullBlockChannelsAlsoIn'

export default class FullBlockChannelsAlsoIn extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    block: propType(fullBlockChannelsAlsoInFragment).isRequired,
  }

  render() {
    const {
      block: { channels_with_same_source },
      loading,
      ...rest
    } = this.props

    return (
      <Box {...rest}>
        {loading && (
          <EmptyCompactChannel>
            <LoadingIndicator f={4} alignItems="center" />
          </EmptyCompactChannel>
        )}

        {channels_with_same_source &&
          channels_with_same_source.map(channel => (
            <CompactChannel
              key={`CompactChannelWithSameSource_${channel.id}`}
              channel={channel}
              mt={3}
            />
          ))}
      </Box>
    )
  }
}
