import gql from 'graphql-tag';

import blockLightboxCommentsFragment from 'react/components/BlockLightbox/components/BlockLightboxComments/fragments/blockLightboxComments';

export default gql`
  query BlockLightboxComments($id: ID!) {
    block: blokk(id: $id) {
      ...BlockLightboxComments
    }
  }
  ${blockLightboxCommentsFragment}
`;
