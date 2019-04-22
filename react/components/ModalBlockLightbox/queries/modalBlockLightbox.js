import gql from 'graphql-tag';

import blockLightboxFragment from 'react/components/BlockLightbox/fragments/blockLightbox';

export default gql`
  query ModalBlockLightbox($id: ID!) {
    block: blokk(id: $id) {
      __typename
      ... on Model {
        id
      }
      ...BlockLightbox
    }
  }
  ${blockLightboxFragment}
`;
