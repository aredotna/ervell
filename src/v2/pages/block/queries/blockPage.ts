import { gql } from '@apollo/client'

import blockPageMetaTagsFragment from 'v2/pages/block/components/BlockPageMetaTags/fragments/blockPageMetaTags'
import fullBlockFragment from 'v2/components/FullBlock/fragments/fullBlock'

export default gql`
  query BlockPage($id: ID!) {
    block: blokk(id: $id) {
      __typename
      ... on Model {
        id
      }
      ...BlockPageMetaTags
      ...FullBlock
    }
  }
  ${fullBlockFragment}
  ${blockPageMetaTagsFragment}
`
