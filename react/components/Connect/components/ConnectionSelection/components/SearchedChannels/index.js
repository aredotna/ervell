import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import ChannelsList from 'react/components/Connect/components/ConnectionSelection/components/ChannelsList';

import searchedChannelsQuery from 'react/components/Connect/components/ConnectionSelection/components/SearchedChannels/queries/searchedChannels';

class SearchedChannels extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
    }).isRequired,
    onConnectionSelection: PropTypes.func.isRequired,
  }

  render() {
    const { data: { loading } } = this.props;

    if (loading) return <div />;

    const { onConnectionSelection, data: { me: { searched_channels: channels } } } = this.props;

    return (
      <ChannelsList
        channels={channels}
        onConnectionSelection={onConnectionSelection}
      />
    );
  }
}

export default graphql(searchedChannelsQuery)(SearchedChannels);
