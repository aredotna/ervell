import gql from 'graphql-tag';

import blockLightboxConnectionsFragment from 'react/components/BlockLightbox/components/BlockLightboxConnections/fragments/blockLightboxConnections';
import blockLightboxCommentsFragment from 'react/components/BlockLightbox/components/BlockLightboxComments/fragments/blockLightboxComments';

export default gql`
  query BlockLightboxFold($id: ID!, $page: Int, $per: Int) {
    block: blokk(id: $id) {
      __typename
      ... on Model {
        id
      }
      ...BlockLightboxConnections
      ...BlockLightboxComments
    }
  }
  ${blockLightboxConnectionsFragment}
  ${blockLightboxCommentsFragment}
`;
