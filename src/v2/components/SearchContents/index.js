import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Query } from '@apollo/client/react/components'

import searchContentsQuery from 'v2/components/SearchContents/queries/searchContents'

import SearchEmptyMessage from 'v2/components/SearchEmptyMessage'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import BlocksLoadingIndicator from 'v2/components/UI/BlocksLoadingIndicator'
import Grid from 'v2/components/UI/Grid'
import Cell from 'v2/components/Cell'

export default class SearchContents extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    q: PropTypes.string.isRequired,
    fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
    block_filter: PropTypes.oneOf([
      'IMAGE',
      'EMBED',
      'TEXT',
      'ATTACHMENT',
      'LINK',
    ]),
  }

  static defaultProps = {
    type: null,
    block_filter: null,
  }

  state = {
    page: 1,
    per: 12,
    hasMore: true,
  }

  loadMore = fetchMore => () => {
    const { page, per } = this.state

    fetchMore({
      variables: { page: page + 1, per },
      updateQuery: (prevResult, { fetchMoreResult }) => ({
        contents: [...prevResult.contents, ...fetchMoreResult.contents],
      }),
    }).then(({ errors, data }) => {
      const {
        contents: { length },
      } = data
      const hasMore = !errors && length > 0 && length >= per

      this.setState({
        page: page + 1,
        hasMore,
      })
    })
  }

  render() {
    const { per, hasMore } = this.state
    const { type, fetchPolicy, q, block_filter } = this.props

    return (
      <Query
        query={searchContentsQuery}
        variables={{
          type,
          per,
          q,
          block_filter,
        }}
        fetchPolicy={fetchPolicy}
        ssr={false}
      >
        {({ loading, error, data, fetchMore }) => {
          if (error) {
            return <ErrorAlert>{error.message}</ErrorAlert>
          }

          if (loading) {
            return <BlocksLoadingIndicator />
          }

          const { contents } = data

          return (
            <div>
              {loading && <BlocksLoadingIndicator />}

              {!loading && contents.length === 0 && (
                <SearchEmptyMessage term={q} type={type} />
              )}

              {!loading && contents.length > 0 && (
                <Grid
                  pageStart={1}
                  threshold={800}
                  initialLoad={false}
                  loader={<BlocksLoadingIndicator key="loading" />}
                  hasMore={contents.length >= per && hasMore}
                  loadMore={this.loadMore(fetchMore)}
                >
                  {contents.map(cell =>
                    ({
                      Image: () => (
                        <Cell.Konnectable
                          key={`${cell.__typename}_${cell.id}`}
                          konnectable={cell}
                        />
                      ),
                      Attachment: () => (
                        <Cell.Konnectable
                          key={`${cell.__typename}_${cell.id}`}
                          konnectable={cell}
                        />
                      ),
                      Text: () => (
                        <Cell.Konnectable
                          key={`${cell.__typename}_${cell.id}`}
                          konnectable={cell}
                        />
                      ),
                      Link: () => (
                        <Cell.Konnectable
                          key={`${cell.__typename}_${cell.id}`}
                          konnectable={cell}
                        />
                      ),
                      Embed: () => (
                        <Cell.Konnectable
                          key={`${cell.__typename}_${cell.id}`}
                          konnectable={cell}
                        />
                      ),
                      Channel: () => (
                        <Cell.Konnectable
                          key={`${cell.__typename}_${cell.id}`}
                          konnectable={cell}
                        />
                      ),
                      User: () => (
                        <Cell.Identifiable
                          key={`${cell.__typename}_${cell.id}`}
                          identifiable={cell}
                        />
                      ),
                      Group: () => (
                        <Cell.Identifiable
                          key={`${cell.__typename}_${cell.id}`}
                          identifiable={cell}
                        />
                      ),
                    }[cell.__typename]())
                  )}
                </Grid>
              )}
            </div>
          )
        }}
      </Query>
    )
  }
}
