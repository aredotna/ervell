import { gql } from '@apollo/client'

import fullBlockCommentFragment from 'v2/components/FullBlock/components/FullBlockComment/fragments/fullBlockComment'

export default gql`
  fragment FullBlockComments on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on Block {
      counts {
        comments
      }
      comments {
        ...FullBlockComment
      }
    }
  }
  ${fullBlockCommentFragment}
`
