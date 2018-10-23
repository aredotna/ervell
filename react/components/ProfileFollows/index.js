import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import BlocksLoadingIndicator from 'react/components/UI/BlocksLoadingIndicator';
import Grid from 'react/components/UI/Grid';
import Cell from 'react/components/Cell';

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

  render() {
    const { page, per, hasMore } = this.state;
    const { id, type } = this.props;

    return (
      <Query
        query={{
          following: profileFollowingQuery,
          followers: profileFollowersQuery,
        }[type]}
        variables={{ id, per }}
      >
        {({
          loading, error, data, fetchMore,
        }) => {
          if (loading) return <BlocksLoadingIndicator />;
          if (error) return error.message;

          const { identity: { identifiable: { [type]: collection } } } = data;

          return (
            <Grid
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
                          [type]: [
                            ...prevResult.identity.identifiable[type],
                            ...fetchMoreResult.identity.identifiable[type],
                          ],
                        },
                      },
                    };
                  },
                }).then((res) => {
                  this.setState({
                    page: page + 1,
                    hasMore: !res.errors && res.data.identity.identifiable[type].length > 0,
                  });
                });
              }}
            >
              {collection.map(cell => ({
                  Channel: <Cell.Konnectable key={`${cell.__typename}_${cell.id}`} konnectable={cell} />,
                  User: <Cell.Identifiable key={`${cell.__typename}_${cell.id}`} identifiable={cell} />,
                  Group: <Cell.Identifiable key={`${cell.__typename}_${cell.id}`} identifiable={cell} />,
                }[cell.__typename]))}
            </Grid>
          );
        }}
      </Query>
    );
  }
}
