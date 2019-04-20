import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import Grid from 'react/components/UI/Grid';
import Cell from 'react/components/Cell';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import BlocksLoadingIndicator from 'react/components/UI/BlocksLoadingIndicator';

import profileGroupsQuery from 'react/components/ProfileGroups/queries/profileGroups';

export default class ProfileGroups extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
  }

  state = {
    page: 1,
    per: 12,
    hasMore: true,
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
            groups: [
              ...prevResult.identity.identifiable.groups,
              ...fetchMoreResult.identity.identifiable.groups,
            ],
          },
        },
      }),
    }).then(({ errors, data }) => {
      const { identity: { identifiable: { groups: { length } } } } = data;
      const hasMore = !errors && length > 0 && length >= per;

      this.setState({
        page: page + 1,
        hasMore,
      });
    });
  }

  render() {
    const { per, hasMore } = this.state;
    const { id, fetchPolicy } = this.props;

    return (
      <Query
        query={profileGroupsQuery}
        variables={{ id, per }}
        fetchPolicy={fetchPolicy}
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

          const { identity: { identifiable: { groups: collection } } } = data;

          return (
            <div>
              {!loading && collection.length > 0 &&
                <Grid
                  pageStart={1}
                  threshold={800}
                  initialLoad={false}
                  loader={<BlocksLoadingIndicator key="loading" />}
                  hasMore={collection.length >= per && hasMore}
                  loadMore={this.loadMore(fetchMore)}
                >
                  {collection.map(cell => ({
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
