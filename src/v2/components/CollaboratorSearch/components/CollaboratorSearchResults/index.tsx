import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'

import SearchResult from 'v2/components/CollaboratorSearch/components/SearchResult'
import CollaboratorSearchResult from 'v2/components/CollaboratorSearch/components/CollaboratorSearchResult'
import CollaboratorInviteButton from 'v2/components/CollaboratorSearch/components/CollaboratorInviteButton'
import collaboratorSearchResultsQuery from 'v2/components/CollaboratorSearch/components/CollaboratorSearchResults/queries/collaboratorSearchResults'

import {
  CollaboratorSearchQuery,
  CollaboratorSearchQueryVariables,
} from '__generated__/CollaboratorSearchQuery'
import isEmail from 'v2/util/isEmail'

const Status = styled(SearchResult)`
  justify-content: center;
  padding: 1.75em 1em;
`

interface CollaboratorSearchResultsProps {
  query: string
  onAdd: ({
    member_id,
    member_type,
  }: {
    member_id: string
    member_type: string
  }) => any
  onInvite: ({ email }: { email: string }) => any
}

export const CollaboratorSearchResults: React.FC<CollaboratorSearchResultsProps> = ({
  query,
  onAdd,
  onInvite,
}) => {
  const { data, loading } = useQuery<
    CollaboratorSearchQuery,
    CollaboratorSearchQueryVariables
  >(collaboratorSearchResultsQuery, {
    variables: {
      query,
    },
  })

  if (isEmail(query)) {
    return <CollaboratorInviteButton email={query} onInvite={onInvite} />
  }

  if (loading) {
    return <Status>Searching...</Status>
  }

  const {
    results: { collaborators },
  } = data

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

export default CollaboratorSearchResults
