import { gql } from '@apollo/client'

import blockLightboxCommentsFragment from 'v2/components/BlockLightbox/components/BlockLightboxComments/fragments/blockLightboxComments'

export default gql`
  query BlockLightboxComments($id: ID!) {
    block: blokk(id: $id) {
      ...BlockLightboxComments
    }
  }
  ${blockLightboxCommentsFragment}
`
