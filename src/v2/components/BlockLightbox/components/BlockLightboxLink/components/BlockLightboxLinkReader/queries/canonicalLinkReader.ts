import { gql } from '@apollo/client'
import readerCanonicalLink from '../fragments/readerCanonicalLink'

export default gql`
  query CanonicalLinkForReader($id: ID!) {
    blokk(id: $id) {
      __typename
      ... on Link {
        id
        canonical_link {
          ...ReaderCanonicalLink
        }
      }
    }
  }
  ${readerCanonicalLink}
`
