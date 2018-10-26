import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import constants from 'react/styles/constants';

import profileContentsQuery from 'react/components/ProfileContents/queries/profileContents';

import ErrorAlert from 'react/components/UI/ErrorAlert';
import SearchInput from 'react/components/UI/SearchInput';
import BlocksLoadingIndicator from 'react/components/UI/BlocksLoadingIndicator';
import Grid from 'react/components/UI/Grid';
import Cell from 'react/components/Cell';

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
    q: null,
  }

  updateQuery = (query) => {
    const q = query === '' ? null : query;
    this.setState({ q, page: 1, hasMore: true });
  }

  render() {
    const {
      page, per, hasMore, q,
    } = this.state;
    const { id, type, sort } = this.props;

    return (
      <Query
        query={profileContentsQuery}
        variables={{
          id, type, per, sort, q,
        }}
        onCompleted={this.updateHasMore}
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

          const { identity: { identifiable: { name, contents } } } = data;

          return (
            <div>
              <SearchInput
                query={q}
                onDebouncedQueryChange={this.updateQuery}
                placeholder={`Filter ${name}’s ${{ BLOCK: 'blocks' }[type] || 'blocks and channels'}`}
                mb={6}
                mr={constants.blockGutter}
                borderColor="transparent"
              />

              {loading &&
                <BlocksLoadingIndicator />
              }

              {!loading &&
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
              }
            </div>
          );
        }}
      </Query>
    );
  }
}
