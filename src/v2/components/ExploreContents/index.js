import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Query } from '@apollo/client/react/components'

import exploreContentsQuery from 'v2/components/ExploreContents/queries/exploreContents'

import ErrorAlert from 'v2/components/UI/ErrorAlert'
import BlocksLoadingIndicator from 'v2/components/UI/BlocksLoadingIndicator'
import Grid from 'v2/components/UI/Grid'
import Cell from 'v2/components/Cell'

export default class ExploreContents extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
    fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
    seed: PropTypes.number,
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
    seed: Math.floor(Math.random() * 1000) + 1,
    block_filter: null,
  }

  state = {
    page: 1,
    per: 12,
    hasMore: true,
    q: null,
  }

  resetQuery = query => {
    const q = query === '' ? null : query
    this.setState({ q, page: 1, hasMore: true })
  }

  loadMore = fetchMore => () => {
    const { page, per } = this.state

    fetchMore({
      variables: { page: page + 1 },
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
    const { per, hasMore, q } = this.state
    const { type, sort, fetchPolicy, seed, block_filter } = this.props

    return (
      <Query
        query={exploreContentsQuery}
        variables={{
          type,
          per,
          sort,
          q,
          seed,
          block_filter,
          page: 1,
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

              {!loading && contents.length > 0 && (
                <Grid
                  pageStart={1}
                  threshold={800}
                  initialLoad={false}
                  loader={<BlocksLoadingIndicator key="loading" />}
                  hasMore={contents.length >= per && hasMore}
                  loadMore={this.loadMore(fetchMore)}
                >
                  {contents.map(blokk => (
                    <Cell.Konnectable
                      key={`${blokk.__typename}_${blokk.id}`}
                      konnectable={blokk}
                      context={contents}
                    />
                  ))}
                </Grid>
              )}
            </div>
          )
        }}
      </Query>
    )
  }
}
