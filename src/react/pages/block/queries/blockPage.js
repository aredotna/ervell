import gql from 'graphql-tag';

import blockPageMetaTagsFragment from 'react/pages/block/components/BlockPageMetaTags/fragments/blockPageMetaTags';
import blockLightboxFragment from 'react/components/BlockLightbox/fragments/blockLightbox';

export default gql`
  query BlockPage($id: ID!) {
    block: blokk(id: $id) {
      __typename
      ... on Model {
        id
      }
      ...BlockPageMetaTags
      ...BlockLightbox
    }
  }
  ${blockLightboxFragment}
  ${blockPageMetaTagsFragment}
`;
