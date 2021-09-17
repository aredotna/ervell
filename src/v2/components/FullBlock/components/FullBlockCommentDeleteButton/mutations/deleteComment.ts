import { gql } from '@apollo/client'

import fullBlockCommentsFragment from 'v2/components/FullBlock/components/FullBlockComments/fragments/fullBlockComments'

export default gql`
  mutation deleteCommentMutation($id: ID!) {
    delete_comment(input: { id: $id }) {
      commentable {
        __typename
        ... on Model {
          id
        }
        ...FullBlockComments
      }
    }
  }
  ${fullBlockCommentsFragment}
`
