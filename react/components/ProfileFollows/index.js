import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import Grid from 'react/components/UI/Grid';
import Cell from 'react/components/Cell';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import BlocksLoadingIndicator from 'react/components/UI/BlocksLoadingIndicator';

import profileFollowingQuery from 'react/components/ProfileFollows/queries/profileFollowing';
import profileFollowersQuery from 'react/components/ProfileFollows/queries/profileFollowers';

export default class ProfileFollows extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.oneOf(['followers', 'following']).isRequired,
  }

  state = {
    page: 1,
    per: 20,
    hasMore: true,
  }

  loadMore = fetchMore => () => {
    const { page, per } = this.state;
    const { type } = this.props;

    fetchMore({
      variables: { page: page + 1, per },
      updateQuery: (prevResult, { fetchMoreResult }) => ({
        ...prevResult,
        identity: {
          ...prevResult.identity,
          identifiable: {
            ...prevResult.identity.identifiable,
            [type]: [
              ...prevResult.identity.identifiable[type],
              ...fetchMoreResult.identity.identifiable[type],
            ],
          },
        },
      }),
    }).then(({ errors, data }) => {
      const { identity: { identifiable: { [type]: { length } } } } = data;
      const hasMore = !errors && length > 0 && length >= per;

      this.setState({
        page: page + 1,
        hasMore,
      });
    });
  }

  render() {
    const { per, hasMore } = this.state;
    const { id, type } = this.props;

    return (
      <Query
        query={{
          following: profileFollowingQuery,
          followers: profileFollowersQuery,
        }[type]}
        key={type}
        variables={{ id, per }}
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

          const { identity: { identifiable: { [type]: collection } } } = data;

          return (
            <div>
              {!loading && collection.length > 0 &&
                <Grid
                  pageStart={1}
                  threshold={500}
                  initialLoad={false}
                  loader={<BlocksLoadingIndicator key="loading" />}
                  hasMore={collection.length >= per && hasMore}
                  loadMore={this.loadMore(fetchMore)}
                >
                  {collection.map(cell => ({
                      Channel: <Cell.Konnectable key={`${cell.__typename}_${cell.id}`} konnectable={cell} />,
                      User: <Cell.Identifiable key={`${cell.__typename}_${cell.id}`} identifiable={cell} />,
                      Group: <Cell.Identifiable key={`${cell.__typename}_${cell.id}`} identifiable={cell} />,
                    }[cell.__typename]))}
                </Grid>
              }
            </div>
          );
        }}
      </Query>
    );
  }
}
