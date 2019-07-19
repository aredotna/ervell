import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'
import InfiniteScroll from 'react-infinite-scroller'
import { map, flatten } from 'underscore'

import groupFeedQuery from 'v2/components/GroupProfileFeed/queries/groupFeed'

import {
  GroupFeedQuery,
  GroupFeedQueryVariables,
} from '__generated__/GroupFeedQuery'

import ErrorAlert from 'v2/components/UI/ErrorAlert'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import BlocksLoadingIndicator from 'v2/components/UI/BlocksLoadingIndicator'
import FeedGroups from 'v2/components/FeedGroups'
import CenteringBox from 'v2/components/UI/CenteringBox'

interface Props {
  id: string
  onCompleted?: () => void
}

interface State {
  offset: number
  limit: number
  hasMore: boolean
}

export default class GroupProfileFeed extends PureComponent<Props, State> {
  public readonly state: State = {
    offset: 0,
    limit: 20,
    hasMore: true,
  }

  getContext = data => {
    if (!data) return []

    const {
      group: {
        feed: { groups },
      },
    } = data
    return flatten(map(groups, group => group.objects))
  }

  render() {
    const { onCompleted, id } = this.props
    const { limit, hasMore, offset } = this.state

    return (
      <Query<GroupFeedQuery, GroupFeedQueryVariables>
        query={groupFeedQuery}
        variables={{ id, limit }}
        onCompleted={onCompleted}
        ssr={false}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading) {
            return (
              <CenteringBox>
                <LoadingIndicator p={6} />
              </CenteringBox>
            )
          }

          if (error) {
            return <ErrorAlert m={6}>{error.message}</ErrorAlert>
          }

          const {
            group: {
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
                        ...prevResult.group,
                        feed: {
                          ...prevResult.group.feed,
                          groups: [
                            ...prevResult.group.feed.groups,
                            ...fetchMoreResult.group.feed.groups,
                          ],
                        },
                      },
                    }

                    return mergedResults
                  },
                }).then(res => {
                  this.setState({
                    offset: offset + limit,
                    hasMore:
                      !res.errors && res.data.group.feed.groups.length > 0,
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
