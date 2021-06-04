import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import styled from 'styled-components'

import collaboratorSearchResultFragment from 'v2/components/CollaboratorSearch/components/CollaboratorSearchResult/fragments/collaboratorSearchResult'

import UserAvatar from 'v2/components/UserAvatar'
import CollaboratorAddButton from 'v2/components/CollaboratorSearch/components/CollaboratorAddButton'
import SearchResult from 'v2/components/CollaboratorSearch/components/SearchResult'
import Badge from 'v2/components/UI/Badge'

const Information = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 1em;
`

const Name = styled.a`
  display: block;
  font-weight: bold;
`

const Email = styled.div`
  color: ${x => x.theme.colors.gray.medium};
`

const Amount = styled.div`
  color: ${x => x.theme.colors.gray.medium};
`

export default class CollaboratorSearchResult extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    result: propType(collaboratorSearchResultFragment).isRequired,
  }

  render() {
    const { result, onAdd } = this.props

    return (
      <SearchResult>
        {result.__typename === 'User' && <UserAvatar user={result} />}

        <Information>
          <Name href={result.href}>
            {result.name}
            {result.__typename === 'Group' && (
              <Badge
                ml={2}
                f={0}
                color="gray.medium"
                icon={{ private: 'Lock' }[result.visibility]}
              >
                Group
              </Badge>
            )}
          </Name>

          {result.hidden_email && <Email>{result.hidden_email}</Email>}

          {result.__typename === 'Group' && (
            <Amount>Group started by {result.user.name}</Amount>
          )}
        </Information>

        <CollaboratorAddButton
          member_id={result.id}
          member_type={result.__typename.toUpperCase()}
          onAdd={onAdd}
        />
      </SearchResult>
    )
  }
}
