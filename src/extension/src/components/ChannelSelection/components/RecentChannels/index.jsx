import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'graphql-anywhere'
import { graphql } from 'react-apollo'

import selectableChannelFragment from 'extension/src/components/SelectableChannel/fragments/selectableChannel'
import recentChannelsQuery from 'extension/src/components/ChannelSelection/components/RecentChannels/queries/recentChannels'

import ChannelList from 'extension/src/components/ChannelSelection/components/ChannelList'

class RecentChannels extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      recent_channels: PropTypes.arrayOf(propType(selectableChannelFragment)),
    }).isRequired,
  }

  render() {
    const { data } = this.props

    const channels =
      !data.loading &&
      data.me &&
      data.me.recent_channels.length > 0 &&
      data.me.recent_channels

    return (
      <ChannelList
        loading={data.loading}
        channels={channels}
        header="Recent channels"
      />
    )
  }
}

export default graphql(recentChannelsQuery)(RecentChannels)
