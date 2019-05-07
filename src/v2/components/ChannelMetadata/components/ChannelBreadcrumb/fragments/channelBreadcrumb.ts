import gql from 'graphql-tag'

export default gql`
  fragment ChannelBreadcrumb on Channel {
    __typename
    id
    title
    truncatedTitle: title(truncate: 35)
    href
    visibility
    owner {
      __typename
      ... on User {
        id
        name
        href
      }
      ... on Group {
        id
        name
        href
      }
    }
    counts {
      collaborators
    }
  }
`
