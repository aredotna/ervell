import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import channelMetadataFragment from 'react/components/ChannelMetadata/fragments/channelMetadata';

export default class MockChannel extends Component {
  static propTypes = {
    ChannelComponent: PropTypes.node.isRequired,
  }

  render() {
    const { ChannelComponent } = this.props;

    return (
      <Query
        query={gql`
            query channel {
              channel(id: 15) {
                ...ChannelMetadata
              }
            }
            ${channelMetadataFragment}
          `}
      >
        {({ data, loading }) => {
          if (loading) {
            return (<div />);
          }
          return (<ChannelComponent channel={data.channel} />);
        }}
      </Query>
    );
  }
}
