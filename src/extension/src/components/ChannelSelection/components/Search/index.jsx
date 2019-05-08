import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import SearchInput from 'v2/components/UI/SearchInput'

class Search extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
  }

  render() {
    const { onChange, query } = this.props

    return (
      <SearchInput
        query={query}
        onQueryChange={onChange}
        placeholder="Filter channels"
        autoFocus
      />
    )
  }
}

export default Search
