import { gql } from '@apollo/client'
import loadingBreadcrumbUserFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbUser'
import loadingBreadcrumbGroupFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbGroup'
import loadingBreadcrumbChannelFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbChannel'

export default gql`
  fragment FeedObject on DeedKind {
    __typename

    ... on Channel {
      id
      truncatedTitle: title
      href
      visibility
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

    ... on Attachment {
      id
      label: to_s
      href
    }

    ... on Embed {
      id
      label: to_s
      href
    }

    ... on Text {
      id
      label: to_s
      href
    }

    ... on Image {
      id
      label: to_s
      href
    }

    ... on Link {
      id
      label: to_s
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
    ...LoadingBreadcrumbChannel
    ...LoadingBreadcrumbGroup
    ...LoadingBreadcrumbUser
  }
  ${loadingBreadcrumbUserFragment}
  ${loadingBreadcrumbGroupFragment}
  ${loadingBreadcrumbChannelFragment}
`
