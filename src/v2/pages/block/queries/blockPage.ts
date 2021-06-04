import { gql } from '@apollo/client'

import blockPageMetaTagsFragment from 'v2/pages/block/components/BlockPageMetaTags/fragments/blockPageMetaTags'
import blockLightboxFragment from 'v2/components/BlockLightbox/fragments/blockLightbox'

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
`
