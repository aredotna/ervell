import gql from 'graphql-tag'

export default gql`
  query CanonicalLinkForReader($id: ID!) {
    blokk(id: $id) {
      __typename
      ... on Link {
        id
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
`
