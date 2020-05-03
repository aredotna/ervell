import gql from 'graphql-tag'
import loadingBreadcrumbUserFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbUser'
import loadingBreadcrumbGroupFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbGroup'
import loadingBreadcrumbChannelFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbChannel'

export default gql`
  fragment FeedObject on DeedKind {
    __typename

    ... on Channel {
      id
      label: title
      truncatedTitle: title
      href
      visibility
      ...LoadingBreadcrumbChannel
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
      ...LoadingBreadcrumbUser
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
      ...LoadingBreadcrumbGroup
    }
  }
  ${loadingBreadcrumbUserFragment}
  ${loadingBreadcrumbGroupFragment}
  ${loadingBreadcrumbChannelFragment}
`
