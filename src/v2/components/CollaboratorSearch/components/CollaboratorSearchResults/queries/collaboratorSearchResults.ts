import gql from 'graphql-tag';

import collaboratorSearchResultsFragment from 'v2/components/CollaboratorSearch/components/CollaboratorSearchResults/fragments/collaboratorSearchResults';

export default gql`
  query CollaboratorSearchQuery(
    $query: String!
    $types: [SearchesCollaboratorsType!]
  ) {
    results: searches {
      ...CollaboratorSearchResults
    }
  }
  ${collaboratorSearchResultsFragment}
`;
