import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { debounce } from 'underscore'

import Layout from 'extension/src/components/Layout'
import Box from 'v2/components/UI/Box'
import Search from 'extension/src/components/ChannelSelection/components/Search'
import RecentChannels from 'extension/src/components/ChannelSelection/components/RecentChannels'
import SearchResults from 'extension/src/components/ChannelSelection/components/SearchResults'

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  width: 100%;
`

class ChannelSelection extends PureComponent {
  state = {
    query: '',
    debouncedQuery: '',
  }

  updateQuery = query => {
    this.setState({ query })
    this.debouceQuery(query)
  }

  debouceQuery = debounce(debouncedQuery => {
    this.setState({ debouncedQuery })
  }, 250)

  render() {
    const { query, debouncedQuery } = this.state

    return (
      <Layout showBack showClose={false}>
        <Container mt={9}>
          <Search query={query} onChange={this.updateQuery} />

          {query.length > 0 && (
            <SearchResults query={query} debouncedQuery={debouncedQuery} />
          )}

          {query.length === 0 && (
            <React.Fragment>
              <RecentChannels />
            </React.Fragment>
          )}
        </Container>
      </Layout>
    )
  }
}

export default ChannelSelection
