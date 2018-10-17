import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';

import profileChannelsQuery from 'react/components/ProfileChannels/queries/profileChannels';

import Grid from 'react/components/UI/Grid';
import Blokk from 'react/components/Blokk';
import ChannelRow from 'react/components/ProfileChannels/components/ChannelRow';
import BlocksLoadingIndicator from 'react/components/UI/BlocksLoadingIndicator';

export default class ProfileChannels extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  }

  state = {
    page: 1,
    per: 3,
    hasMore: true,
  }

  render() {
    const { page, per, hasMore } = this.state;
    const { id, sort } = this.props;

    return (
      <Query query={profileChannelsQuery} variables={{ id, per, sort }}>
        {({
          loading, error, data, fetchMore,
        }) => {
          if (loading) return <BlocksLoadingIndicator />;
          if (error) return error.message;

          const { identity: { identifiable: { channels } } } = data;

          return (
            <InfiniteScroll
              className="Constrain"
              pageStart={1}
              threshold={500}
              loader={<BlocksLoadingIndicator key="loading" />}
              hasMore={hasMore}
              loadMore={() => {
                fetchMore({
                  variables: { page: page + 1, per },
                  updateQuery: (prevResult, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prevResult;

                    return {
                      ...prevResult,
                      identity: {
                        ...prevResult.identity,
                        identifiable: {
                          ...prevResult.identity.identifiable,
                          channels: [
                            ...prevResult.identity.identifiable.channels,
                            ...fetchMoreResult.identity.identifiable.channels,
                          ],
                        },
                      },
                    };
                  },
                }).then((res) => {
                  this.setState({
                    page: page + 1,
                    hasMore: !res.errors && res.data.identity.identifiable.channels.length > 0,
                  });
                });
              }}
            >
              {channels.map(channel => (
                <ChannelRow key={channel.id}>
                  <Grid>
                    <Blokk blokk={channel} />

                    {channel.blokks.map(blokk =>
                      <Blokk key={`${blokk.__typename}_${blokk.id}`} blokk={blokk} />)}
                  </Grid>
                </ChannelRow>
              ))}
            </InfiniteScroll>
          );
        }}
      </Query>
    );
  }
}
