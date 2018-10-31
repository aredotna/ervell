import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import searchedChannelsQuery from 'react/components/ConnectionSelectionList/components/SearchedChannels/queries/searchedChannels';

import Indicator from 'react/components/ConnectionSelectionList/components/Indicator';
import ChannelsList from 'react/components/ConnectionSelectionList/components/ChannelsList';

export default class SearchedChannels extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    onConnectionSelection: PropTypes.func.isRequired,
  }

  render() {
    const { query, onConnectionSelection } = this.props;

    return (
      <Query query={searchedChannelsQuery} variables={{ query }} >
        {({ data, error, loading }) => {
          if (error) return <Indicator label="Error" />;
          if (loading) return <Indicator label="Searching..." />;

          const { me: { searched_channels } } = data;

          return (
            <ChannelsList
              channels={searched_channels}
              onConnectionSelection={onConnectionSelection}
            />
          );
        }}
      </Query>
    );
  }
}
