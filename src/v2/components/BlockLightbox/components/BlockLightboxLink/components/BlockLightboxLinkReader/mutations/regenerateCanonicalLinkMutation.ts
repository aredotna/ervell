import gql from 'graphql-tag'

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
            __typename
            id
            url
            title
            content
            provider_name
            authors
            published_at(format: "%B %-d, %Y")
            state
          }
        }
      }
    }
  }
`
