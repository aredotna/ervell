import { gql } from '@apollo/client'

import blockLightboxCommentsFragment from 'v2/components/BlockLightbox/components/BlockLightboxComments/fragments/blockLightboxComments'

export default gql`
  mutation CreateComment($body: String!, $block_id: ID!) {
    create_comment(input: { body: $body, block_id: $block_id }) {
      __typename
      comment {
        __typename
        id
        commentable {
          ...BlockLightboxComments
        }
      }
    }
  }
  ${blockLightboxCommentsFragment}
`
