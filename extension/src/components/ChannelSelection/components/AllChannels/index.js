import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { graphql } from 'react-apollo';

import selectableChannelFragment from 'extension/src/components/SelectableChannel/fragments/selectableChannel';
import allChannelsQuery from 'extension/src/components/ChannelSelection/components/AllChannels/queries/allChannels';

import ChannelList from 'extension/src/components/ChannelSelection/components/ChannelList';

class AllChannels extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      all_channels: PropTypes.arrayOf(propType(selectableChannelFragment)),
    }).isRequired,
  }

  render() {
    const { data } = this.props;

    const channels = (
      !data.loading &&
      data.me &&
      data.me.all_channels.length > 0 &&
      data.me.all_channels
    );

    return (
      <ChannelList
        loading={data.loading}
        channels={channels}
        header="All channels"
      />
    );
  }
}

export default graphql(allChannelsQuery)(AllChannels);
