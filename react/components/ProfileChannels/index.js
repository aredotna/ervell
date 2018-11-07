import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';

import constants from 'react/styles/constants';

import profileChannelsQuery from 'react/components/ProfileChannels/queries/profileChannels';

import Grid from 'react/components/UI/Grid';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import SearchInput from 'react/components/UI/SearchInput';
import Cell from 'react/components/Cell';
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
    q: null,
  }

  resetQuery = (query) => {
    const q = query === '' ? null : query;
    this.setState({ q, page: 1, hasMore: true });
  }

  loadMore = fetchMore => () => {
    const { page, per } = this.state;

    fetchMore({
      variables: { page: page + 1, per },
      updateQuery: (prevResult, { fetchMoreResult }) => ({
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
      }),
    }).then(({ errors, data }) => {
      const { identity: { identifiable: { channels: { length } } } } = data;
      const hasMore = !errors && length > 0 && length >= per;

      this.setState({
        page: page + 1,
        hasMore,
      });
    });
  }

  render() {
    const { per, hasMore, q } = this.state;
    const { id, sort } = this.props;

    return (
      <Query
        query={profileChannelsQuery}
        variables={{
          id, per, sort, q,
        }}
      >
        {({
          loading, error, data, fetchMore,
        }) => {
          if (error) {
            return (
              <ErrorAlert>
                {error.message}
              </ErrorAlert>
            );
          }

          if (!data.identity) {
            return <BlocksLoadingIndicator />;
          }

          const { identity: { identifiable: { __typename, name, channels } } } = data;

          return (
            <div>
              {__typename === 'User' &&
                <SearchInput
                  query={q}
                  onDebouncedQueryChange={this.resetQuery}
                  placeholder={`Filter ${name}’s channels`}
                  mb={6}
                  mr={[
                    constants.blockGutter,
                    constants.doubleBlockGutter,
                    constants.doubleBlockGutter,
                  ]}
                  ml={[constants.blockGutter, 0, 0]}
                  borderColor="transparent"
                />
              }

              {loading &&
                <BlocksLoadingIndicator />
              }

              {!loading && channels.length > 0 &&
                <InfiniteScroll
                  pageStart={1}
                  threshold={500}
                  initialLoad={false}
                  loader={<BlocksLoadingIndicator key="loading" />}
                  hasMore={channels.length >= per && hasMore}
                  loadMore={this.loadMore(fetchMore)}
                >
                  {channels.map(channel => (
                    <ChannelRow key={channel.id}>
                      <Grid>
                        <Cell.Konnectable konnectable={channel} />

                        {channel.blokks.map(blokk => (
                          <Cell.Konnectable
                            key={`${blokk.__typename}_${blokk.id}`}
                            konnectable={blokk}
                            context={channel.blokks}
                          />
                        ))}
                      </Grid>
                    </ChannelRow>
                  ))}
                </InfiniteScroll>
              }
            </div>
          );
        }}
      </Query>
    );
  }
}
