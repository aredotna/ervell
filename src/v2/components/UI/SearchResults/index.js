import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import Result from 'v2/components/UI/SearchResults/SearchResult'

import userSearchResultFragment from 'v2/components/UI/SearchResults/User/fragments/userSearchResult'
import groupSearchResultFragment from 'v2/components/UI/SearchResults/Group/fragments/groupSearchResult'

export default class SearchResults extends Component {
  static propTypes = {
    results: PropTypes.arrayOf(
      PropTypes.oneOfType([
        propType(userSearchResultFragment),
        propType(groupSearchResultFragment),
      ])
    ).isRequired,
  }

  render() {
    const { results } = this.props

    return (
      <div>
        {results.map(result => (
          <Result key={`${result.__typename}-${result.id}`} result={result} />
        ))}
      </div>
    )
  }
}
