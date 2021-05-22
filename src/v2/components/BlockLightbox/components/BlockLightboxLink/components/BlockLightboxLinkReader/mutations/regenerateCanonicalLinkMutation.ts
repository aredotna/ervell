import { gql } from '@apollo/client'
import readerCanonicalLink from '../fragments/readerCanonicalLink'

export default gql`
  mutation regenerateCanonicalLink($block_id: ID!) {
    regenerate_canonical_link(input: { block_id: $block_id }) {
      blokk {
        __typename
        ... on Model {
          id
        }

        ... on Link {
          canonical_link {
            ...ReaderCanonicalLink
          }
        }
      }
    }
  }
  ${readerCanonicalLink}
`
