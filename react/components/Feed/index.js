import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import feedQuery from 'react/components/Feed/queries/feedQuery';
import InfiniteScroll from 'react-infinite-scroller';

import Text from 'react/components/UI/Text';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import BlocksLoadingIndicator from 'react/components/UI/BlocksLoadingIndicator';
import FeedGroups from 'react/components/Feed/components/FeedGroups/index';
import CenteringBox from 'react/components/UI/CenteringBox';

const LoadingContainer = styled(CenteringBox)`
  margin-top: -250px; // Hack for now
`;

export default class Feed extends PureComponent {
  static propTypes = {
    onCompleted: PropTypes.func,
  }

  static defaultProps = {
    onCompleted: () => {},
  }

  state = {
    offset: 0,
    limit: 20,
    hasMore: true,
  }

  render() {
    const { onCompleted } = this.props;
    const { limit, hasMore, offset } = this.state;

    return (
      <Query query={feedQuery} variables={{ limit }} onCompleted={onCompleted}>
        {({
          loading, error, data, fetchMore,
        }) => {
          if (loading) {
            return (
              <LoadingContainer>
                <LoadingIndicator p={6} />
              </LoadingContainer>
            );
          }

          if (error) {
            return (
              <Text color="state.alert" f={2} p={6}>
                {error.message}
              </Text>
            );
          }

          const { me: { feed: { groups } } } = data;

          return (
            <InfiniteScroll
              pageStart={1}
              threshhold={500}
              loader={<BlocksLoadingIndicator key="loading" />}
              hasMore={hasMore}
              loadMore={() => {
                fetchMore({
                  variables: { limit, offset: (offset + limit) },
                  updateQuery: (prevResult, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prevResult;

                    const mergedResults = {
                      ...prevResult,
                      me: {
                        ...prevResult.me,
                        feed: {
                          ...prevResult.me.feed,
                          groups: [
                            ...prevResult.me.feed.groups,
                            ...fetchMoreResult.me.feed.groups,
                          ],
                        },
                      },
                    };

                    return mergedResults;
                  },
                }).then((res) => {
                  this.setState({
                    offset: (offset + limit),
                    hasMore: !res.errors && res.data.me.feed.groups.length > 0,
                  });
                });
              }}
            >
              <FeedGroups groups={groups} />
            </InfiniteScroll>
          );
        }}
      </Query>
    );
  }
}
