import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import { graphql } from '@apollo/client/react/hoc'
import styled from 'styled-components'

import isEmail from 'lib/is_email.coffee'

import collaboratorSearchResultsQuery from 'v2/components/CollaboratorSearch/components/CollaboratorSearchResults/queries/collaboratorSearchResults'
import collaboratorSearchResultsFragment from 'v2/components/CollaboratorSearch/components/CollaboratorSearchResults/fragments/collaboratorSearchResults'

import SearchResult from 'v2/components/CollaboratorSearch/components/SearchResult'
import CollaboratorSearchResult from 'v2/components/CollaboratorSearch/components/CollaboratorSearchResult'
import CollaboratorInviteButton from 'v2/components/CollaboratorSearch/components/CollaboratorInviteButton'

const Status = styled(SearchResult)`
  justify-content: center;
  padding: 1.75em 1em;
`

class CollaboratorSearchResults extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired,
    onInvite: PropTypes.func.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      results: propType(collaboratorSearchResultsFragment),
    }).isRequired,
  }

  render() {
    const {
      data: { loading },
      onAdd,
      onInvite,
      query,
    } = this.props

    if (isEmail(query)) {
      return <CollaboratorInviteButton email={query} onInvite={onInvite} />
    }

    if (loading) {
      return <Status>Searching...</Status>
    }

    const {
      data: {
        results: { collaborators },
      },
    } = this.props

    if (collaborators.length === 0) {
      return <Status>Nothing found.</Status>
    }

    return (
      <div>
        {collaborators.map(collaborator => (
          <CollaboratorSearchResult
            key={`${collaborator.__typename}-${collaborator.id}`}
            result={collaborator}
            onAdd={onAdd}
          />
        ))}
      </div>
    )
  }
}

export default graphql(collaboratorSearchResultsQuery)(
  CollaboratorSearchResults
)
