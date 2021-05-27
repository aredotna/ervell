import { gql } from '@apollo/client'

import blockLightboxCommentFragment from 'v2/components/BlockLightbox/components/BlockLightboxComment/fragments/blockLightboxComment'

export default gql`
  fragment BlockLightboxComments on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on Block {
      counts {
        comments
      }
      comments {
        ...BlockLightboxComment
      }
    }
  }
  ${blockLightboxCommentFragment}
`
