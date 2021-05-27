import { gql } from '@apollo/client'

import loadingBreadcrumbUserFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbUser'
import loadingBreadcrumbGroupFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbGroup'

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
        ...LoadingBreadcrumbUser
      }
      ... on Group {
        id
        name
        href
        ...LoadingBreadcrumbGroup
      }
    }
    counts {
      collaborators
    }
    ...LoadingBreadcrumbChannel
  }
  ${loadingBreadcrumbUserFragment}
  ${loadingBreadcrumbGroupFragment}
`
