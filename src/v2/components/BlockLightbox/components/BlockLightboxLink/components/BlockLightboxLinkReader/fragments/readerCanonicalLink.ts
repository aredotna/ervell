import { gql } from '@apollo/client'

export default gql`
  fragment ReaderCanonicalLink on CanonicalLink {
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
`
