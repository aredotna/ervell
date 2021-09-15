import { gql } from '@apollo/client'

import fullBlockCommentsFragment from 'v2/components/FullBlock/components/FullBlockComments/fragments/fullBlockComments'

export default gql`
  mutation CreateComment($body: String!, $block_id: ID!) {
    create_comment(input: { body: $body, block_id: $block_id }) {
      __typename
      comment {
        __typename
        id
        commentable {
          ...FullBlockComments
        }
      }
    }
  }
  ${fullBlockCommentsFragment}
`
