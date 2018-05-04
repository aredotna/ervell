import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import ChannelsList from 'react/components/Connect/components/ConnectionSelection/components/ChannelsList';
import LoadingIndicator from 'react/components/Connect/components/ConnectionSelection/components/RecentChannels/components/LoadingIndicator';

import recentChannelsQuery from 'react/components/Connect/components/ConnectionSelection/components/RecentChannels/queries/recentChannels';

class RecentChannels extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
    }).isRequired,
    onConnectionSelection: PropTypes.func.isRequired,
  }

  render() {
    const {
      onConnectionSelection, data: { loading }, ...rest
    } = this.props;

    if (loading) return <LoadingIndicator {...rest} />;

    const { data: { me: { recent_channels } } } = this.props;

    // TODO: Fix the schema to prevent having map out `kind`
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
