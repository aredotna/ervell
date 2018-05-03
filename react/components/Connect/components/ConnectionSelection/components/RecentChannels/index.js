import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import ChannelsList from 'react/components/Connect/components/ConnectionSelection/components/ChannelsList';

import recentChannelsQuery from 'react/components/Connect/components/ConnectionSelection/components/RecentChannels/queries/recentChannels';

class RecentChannels extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
    }).isRequired,
    onConnectionSelection: PropTypes.func.isRequired,
  }

  render() {
    const { data: { loading } } = this.props;

    if (loading) return <div />;

    const {
      onConnectionSelection, data: { me: { recent_channels } }, ...rest
    } = this.props;

    // Deals with the fucked up schema
    // TODO: Fix the schema to prevent this non-sense
    const channels = recent_channels.map(({ kind }) => kind);

    return (
      <ChannelsList
        channels={channels}
        onConnectionSelection={onConnectionSelection}
        {...rest}
      />
    );
  }
}

export default graphql(recentChannelsQuery)(RecentChannels);
