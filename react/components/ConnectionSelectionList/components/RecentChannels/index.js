import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import ChannelsList from 'react/components/ConnectionSelectionList/components/ChannelsList';
import LoadingIndicator from 'react/components/ConnectionSelectionList/components/RecentChannels/components/LoadingIndicator';

import recentChannelsQuery from 'react/components/ConnectionSelectionList/components/RecentChannels/queries/recentChannels';

class RecentChannels extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
    }).isRequired,
    isOutlined: PropTypes.bool,
    onConnectionSelection: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isOutlined: true,
  }

  render() {
    const {
      onConnectionSelection,
      isOutlined: _isOutlined,
      data: { loading },
      ...rest
    } = this.props;

    if (loading) return <LoadingIndicator {...rest} />;

    const { data: { me: { recent_channels: channels } } } = this.props;

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
