import gql from 'graphql-tag'

export default gql`
  fragment FeedObject on DeedKind {
    __typename

    ... on Channel {
      id
      label: title
      truncatedTitle: title
      href
      visibility
      owner {
        ... on User {
          name
        }
        ... on Group {
          name
        }
      }
    }

    ... on Connectable {
      id
      label: to_s
      href
    }

    ... on User {
      id
      label: name
      name
      href
    }

    ... on Comment {
      id
      body(truncate: 100)
      href
    }

    ... on Group {
      id
      label: name
      name
      href
    }
  }
`
