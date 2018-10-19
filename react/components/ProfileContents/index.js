import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import BlocksLoadingIndicator from 'react/components/UI/BlocksLoadingIndicator';
import Grid from 'react/components/UI/Grid';
import Cell from 'react/components/Cell';

import profileContentsQuery from 'react/components/ProfileContents/queries/profileContents';

export default class ProfileContents extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  }

  static defaultProps = {
    type: null,
  }

  state = {
    page: 1,
    per: 20,
    hasMore: true,
  }

  render() {
    const { page, per, hasMore } = this.state;
    const { id, type, sort } = this.props;

    return (
      <Query
        query={profileContentsQuery}
        variables={{
          id, type, per, sort,
        }}
      >
        {({
          loading, error, data, fetchMore,
        }) => {
          if (loading) return <BlocksLoadingIndicator />;
          if (error) return error.message;

          const { identity: { identifiable: { contents } } } = data;

          return (
            <div className="Constrain">
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
                            contents: [
                              ...prevResult.identity.identifiable.contents,
                              ...fetchMoreResult.identity.identifiable.contents,
                            ],
                          },
                        },
                      };
                    },
                  }).then((res) => {
                    this.setState({
                      page: page + 1,
                      hasMore: !res.errors && res.data.identity.identifiable.contents.length > 0,
                    });
                  });
                }}
              >
                {contents.map(blokk =>
                  <Cell.Konnectable key={`${blokk.__typename}_${blokk.id}`} konnectable={blokk} />)}
              </Grid>
            </div>
          );
        }}
      </Query>
    );
  }
}
