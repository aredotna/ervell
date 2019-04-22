import gql from 'graphql-tag';

import collaboratorSearchResultFragment from 'react/components/CollaboratorSearch/components/CollaboratorSearchResult/fragments/collaboratorSearchResult';

export default gql`
  fragment CollaboratorSearchResults on Searches {
    collaborators(query: $query, limit: 4, types: $types) {
      ...CollaboratorSearchResult
    }
  }
  ${collaboratorSearchResultFragment}
`;
