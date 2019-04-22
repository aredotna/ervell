import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import groupSearchResultFragment from 'react/components/UI/SearchResults/Group/fragments/groupSearchResult';

import MemberAvatar from 'react/components/MemberAvatar';
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
        <MemberAvatar
          member={group}
          isLinked={false}
          size={40}
        />
        <Information>
          <Name>{group.name}</Name>

          <Amount>
            Group started by {group.user.name}
          </Amount>
        </Information>

        {children && children}
      </Container>
    );
  }
}
