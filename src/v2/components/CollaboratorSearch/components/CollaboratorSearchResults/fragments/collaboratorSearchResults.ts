import { gql } from '@apollo/client'

import collaboratorSearchResultFragment from 'v2/components/CollaboratorSearch/components/CollaboratorSearchResult/fragments/collaboratorSearchResult'

export default gql`
  fragment CollaboratorSearchResults on Searches {
    collaborators(query: $query, limit: 4, types: $types) {
      ...CollaboratorSearchResult
    }
  }
  ${collaboratorSearchResultFragment}
`
