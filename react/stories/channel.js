import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { storiesOf } from '@storybook/react';
import PropTypes from 'prop-types';
import channelMetadataFragment from 'react/components/ChannelMetadata/fragments/channelMetadata';
import ChannelBreadcrumb from 'react/components/ChannelMetadata/components/ChannelBreadcrumb';
import ChannelMetadataInfo from 'react/components/ChannelMetadata/components/ChannelMetadataInfo';

class MockChannel extends Component {
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

storiesOf('Channel', module)
  .add('Breadcrumb', () => (
    <MockChannel ChannelComponent={ChannelBreadcrumb} />
  )).add('Info', () => (
    <MockChannel ChannelComponent={ChannelMetadataInfo} />
  ));
