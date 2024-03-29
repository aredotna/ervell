import { gql } from '@apollo/client'

import fullBlockCommentsFragment from 'v2/components/FullBlock/components/FullBlockComments/fragments/fullBlockComments'

export default gql`
  query FullBlockCommentsQuery($id: ID!) {
    block: blokk(id: $id) {
      ...FullBlockComments
    }
  }
  ${fullBlockCommentsFragment}
`
