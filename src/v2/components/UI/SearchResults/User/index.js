import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import userSearchResultFragment from 'v2/components/UI/SearchResults/User/fragments/userSearchResult'

import {
  Container,
  Avatar,
  Information,
  Name,
  Email,
} from 'v2/components/UI/SearchResults/UI'

export default class UserSearchResult extends Component {
  static propTypes = {
    user: propType(userSearchResultFragment).isRequired,
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    const { user, children } = this.props

    return (
      <Container>
        <Avatar user={user} />

        <Information>
          <Name href={user.href}>{user.name}</Name>

          {user.hidden_email && <Email>{user.hidden_email}</Email>}
        </Information>

        {children && children}
      </Container>
    )
  }
}
