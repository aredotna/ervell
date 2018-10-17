import gql from 'graphql-tag';

import blokkFragment from 'react/components/Blokk/fragments/blokk';

export default gql`
  fragment ProfileContents on Identifiable {
    ... on User {
      __typename
      id: slug
      contents: kontents(type: $type, per: $per, page: $page, direction: DESC, sort_by: $sort) {
        ... Blokk
      }
    }
  }
  ${blokkFragment}
`;
