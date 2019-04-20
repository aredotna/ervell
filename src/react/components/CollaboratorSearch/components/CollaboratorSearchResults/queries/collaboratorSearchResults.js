import gql from 'graphql-tag';

import collaboratorSearchResultsFragment from 'react/components/CollaboratorSearch/components/CollaboratorSearchResults/fragments/collaboratorSearchResults';

export default gql`
  query CollaboratorSearchQuery($query: String!, $types: [SearchesCollaboratorsType!]) {
    results: searches {
      ...CollaboratorSearchResults
    }
  }
  ${collaboratorSearchResultsFragment}
`;
