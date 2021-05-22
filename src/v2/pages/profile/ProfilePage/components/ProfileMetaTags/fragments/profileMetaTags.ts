import { gql } from '@apollo/client'

// TODO: Group canonical & is_indexable

export default gql`
  fragment ProfileMetaTags on Identifiable {
    __typename
    ... on User {
      title: name
      name
      description: bio(format: MARKDOWN)
      href
      canonical: href(absolute: true)
      is_indexable
    }
    ... on Group {
      title: name
      name
      description: description(format: MARKDOWN)
      canonical: href(absolute: true)
      href
    }
  }
`
