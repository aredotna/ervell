import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import groupSearchResultFragment from 'react/components/UI/SearchResults/Group/fragments/groupSearchResult';

import Count from 'react/components/UI/Count';
import { Container, Information, Name, Amount } from 'react/components/UI/SearchResults/UI';

export default class GroupSearchResult extends Component {
  static propTypes = {
    group: propType(groupSearchResultFragment).isRequired,
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    const { group, children } = this.props;

    return (
      <Container>
        <Information>
          <Name>{group.name}</Name>

          <Amount>
            Group (<Count amount={group.counts.users + 1} label="user" />)
          </Amount>
        </Information>

        {children && children}
      </Container>
    );
  }
}
