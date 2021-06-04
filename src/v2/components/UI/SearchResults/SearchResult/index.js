import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import User from 'v2/components/UI/SearchResults/User'
import Group from 'v2/components/UI/SearchResults/Group'

import userSearchResultFragment from 'v2/components/UI/SearchResults/User/fragments/userSearchResult'
import groupSearchResultFragment from 'v2/components/UI/SearchResults/Group/fragments/groupSearchResult'

export default class SearchResult extends Component {
  static propTypes = {
    result: PropTypes.oneOfType([
      propType(userSearchResultFragment),
      propType(groupSearchResultFragment),
    ]).isRequired,
  }

  render() {
    const { result, ...rest } = this.props

    switch (result.__typename) {
      case 'User':
        return <User user={result} {...rest} />
      case 'Group':
        return <Group group={result} {...rest} />
      default:
        return <div />
    }
  }
}
