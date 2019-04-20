import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import User from 'react/components/UI/SearchResults/User';
import Group from 'react/components/UI/SearchResults/Group';

import userSearchResultFragment from 'react/components/UI/SearchResults/User/fragments/userSearchResult';
import groupSearchResultFragment from 'react/components/UI/SearchResults/Group/fragments/groupSearchResult';

export default class SearchResult extends Component {
  static propTypes = {
    result: PropTypes.oneOfType([
      propType(userSearchResultFragment),
      propType(groupSearchResultFragment),
    ]).isRequired,
  }

  render() {
    const { result, ...rest } = this.props;

    switch (result.__typename) {
      case 'User':
        return <User user={result} {...rest} />;
      case 'Group':
        return <Group group={result} {...rest} />;
      default:
        return <div />;
    }
  }
}
