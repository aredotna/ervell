import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import connectionSearchChannelsQuery from 'extension/src/components/ChannelSelection/components/SearchResults/queries/searchResults'

import ChannelList from 'extension/src/components/ChannelSelection/components/ChannelList'

class SearchResults extends PureComponent {
  static propTypes = {
    query: PropTypes.string.isRequired,
    debouncedQuery: PropTypes.string.isRequired,
  }

  render() {
    const { query, debouncedQuery } = this.props

    return (
      <Query
        query={connectionSearchChannelsQuery}
        variables={{ query: debouncedQuery }}
      >
        {({ data, loading }) => {
          const channels =
            !loading &&
            data.me &&
            data.me.searched_channels.length > 0 &&
            data.me.searched_channels

          return (
            <ChannelList
              loading={loading}
              channels={channels}
              header={`Search results for "${query}"`}
            />
          )
        }}
      </Query>
    )
  }
}

export default SearchResults
