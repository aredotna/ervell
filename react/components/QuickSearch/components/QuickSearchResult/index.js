import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import quickSearchResultFragment from 'react/components/QuickSearch/components/QuickSearchResult/fragments/quickSearchResult';

import Badge from 'react/components/UI/Badge';
import SearchResult from 'react/components/QuickSearch/components/SearchResult';
import ColoredChannelLink from 'react/components/UI/ColoredChannelLink';

const Information = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  padding-left: 2.5em;
`;

const Name = styled.a`
  display: block;
  text-decoration: none;
`;

const ChannelName = styled(Name)`
  &:after {
    content: '/';
    margin: 0 0.33em;
    font-weight: normal;
  }
`;

const ChannelLink = styled(ColoredChannelLink)`
  text-decoration: none;
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
            <ChannelName>{result.user.name}</ChannelName>
            <ChannelLink
              href={result.href}
              visibility={result.visibility}
            >
              {result.title}
            </ChannelLink>
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
