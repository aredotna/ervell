import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SearchInput from 'v2/components/UI/SearchInput'

export default class CollaboratorSearch extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
  }

  render() {
    const { query, onChange } = this.props

    return (
      <SearchInput
        query={query}
        onQueryChange={onChange}
        placeholder="Search users, groups, or enter an email address"
      />
    )
  }
}
