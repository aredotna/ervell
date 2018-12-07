import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import quickSearchResultFragment from 'react/components/QuickSearch/components/QuickSearchResult/fragments/quickSearchResult';

import Badge from 'react/components/UI/Badge';
import SearchResult from 'react/components/QuickSearch/components/SearchResult';

const Information = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  padding-left: 2.5em;
`;

const Name = styled.a`
  display: block;
`;

export default class QuickSearchResult extends Component {
  static propTypes = {
    result: propType(quickSearchResultFragment).isRequired,
  }

  resultContent = () => {
    const { result } = this.props;
    const { __typename } = result;


    switch (__typename) {
      case 'Channel':
        return (
          <Information>
            <Name>{result.user.name}</Name>
            <div>/</div>
            <Name>{result.title}</Name>
          </Information>
        );
      case 'User':
        return (
          <Information>
            <Name>{result.name}</Name>
          </Information>
        );
      case 'Group':
        return (
          <Information>
            <Name>{result.name}</Name>
            <Badge f={0} ml={4} color="gray.medium" icon={{ private: 'Lock' }[result.visibility]}>
              Group
            </Badge>
          </Information>
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <SearchResult>
        {this.resultContent()}
      </SearchResult>
    );
  }
}
