import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Query } from '@apollo/client/react/components'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroller'
import { map, flatten } from 'underscore'

import feedQuery from 'v2/components/Feed/queries/feed'

import ErrorAlert from 'v2/components/UI/ErrorAlert'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import BlocksLoadingIndicator from 'v2/components/UI/BlocksLoadingIndicator'
import FeedGroups from 'v2/components/FeedGroups'
import CenteringBox from 'v2/components/UI/CenteringBox'

const LoadingContainer = styled(CenteringBox)`
  margin-top: -250px; // Hack for now
`

export default class Feed extends PureComponent {
  static propTypes = {
    onCompleted: PropTypes.func,
    type: PropTypes.string,
  }

  static defaultProps = {
    onCompleted: () => {},
    type: 'User',
  }

  state = {
    offset: 0,
    limit: 20,
    hasMore: true,
  }

  getContext = data => {
    if (!data) return []

    const {
      me: {
        feed: { groups },
      },
    } = data
    return flatten(map(groups, group => group.objects))
  }

  render() {
    const { onCompleted, type } = this.props
    const { limit, hasMore, offset } = this.state

    return (
      <Query
        query={feedQuery}
        variables={{ limit, type }}
        onCompleted={onCompleted}
        ssr={false}
      >
        {({ loading, error, data, fetchMore }) => {
          if (loading) {
            return (
              <LoadingContainer>
                <LoadingIndicator p={6} />
              </LoadingContainer>
            )
          }

          if (error) {
            return <ErrorAlert m={6}>{error.message}</ErrorAlert>
          }

          const {
            me: {
              feed: { groups },
            },
          } = data

          return (
            <InfiniteScroll
              pageStart={1}
              threshhold={1000}
              loader={<BlocksLoadingIndicator key="loading" />}
              hasMore={hasMore}
              loadMore={() => {
                fetchMore({
                  variables: { limit, offset: offset + limit },
                  updateQuery: (prevResult, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prevResult

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
                    }

                    return mergedResults
                  },
                }).then(res => {
                  this.setState({
                    offset: offset + limit,
                    hasMore: !res.errors && res.data.me.feed.groups.length > 0,
                  })
                })
              }}
            >
              <FeedGroups groups={groups} context={this.getContext(data)} />
            </InfiniteScroll>
          )
        }}
      </Query>
    )
  }
}
