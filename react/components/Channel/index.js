import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import channelQuery from 'react/components/Channel/queries/channel';
import channelMetadataFragment from 'react/components/ChannelMetadata/fragments/channelMetadata';

import ChannelMetadata from 'react/components/ChannelMetadata';

class Channel extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      channel: propType(channelMetadataFragment),
    }).isRequired,
  }

  render() {
    const { data: { loading } } = this.props;

    if (loading) return <div />;

    const { data: { channel } } = this.props;

    return (
      <div>
        <ChannelMetadata channel={channel} />
      </div>
    );
  }
}

export default graphql(channelQuery)(Channel);
