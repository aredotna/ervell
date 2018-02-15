import gql from 'graphql-tag';

import collaboratorSearchResultFragment from 'react/components/CollaboratorSearch/components/CollaboratorSearchResults/fragments/collaboratorSearchResult';

export default gql`
  query CollaboratorSearchQuery($query: String!) {
    results: search(q: $query, per: 15, type: USER) {
      ... on User {
        ...CollaboratorSearchResult
      }
    }
  }
  ${collaboratorSearchResultFragment}
`;
