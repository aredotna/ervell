import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import userSearchResultFragment from 'react/components/UI/SearchResults/User/fragments/userSearchResult';

import { Container, Avatar, Information, Name, Email } from 'react/components/UI/SearchResults/UI';

export default class UserSearchResult extends Component {
  static propTypes = {
    user: propType(userSearchResultFragment).isRequired,
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    const { user, children } = this.props;

    return (
      <Container>
        <Avatar user={user} />

        <Information>
          <Name href={user.href}>{user.name}</Name>

          {user.hidden_email &&
            <Email>{user.hidden_email}</Email>
          }
        </Information>

        {children && children}
      </Container>
    );
  }
}
