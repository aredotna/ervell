import { gql } from '@apollo/client'

import fullBlockFragment from 'v2/components/FullBlock/fragments/fullBlock'

export default gql`
  query ModalFullBlock($id: ID!) {
    block: blokk(id: $id) {
      __typename
      ... on Model {
        id
      }
      ...FullBlock
    }
  }
  ${fullBlockFragment}
`
