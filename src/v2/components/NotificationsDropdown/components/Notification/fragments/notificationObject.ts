import { gql } from '@apollo/client'

import loadingBreadcrumbUserFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbUser'
import loadingBreadcrumbGroupFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbGroup'
import loadingBreadcrumbChannelFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbChannel'

export default gql`
  fragment NotificationObject on DeedKind {
    __typename

    ... on Channel {
      id
      label: title
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
      href
      is_me
    }

    ... on Comment {
      id
      body(truncate: 100)
      href
    }

    ... on Group {
      id
      label: name
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
