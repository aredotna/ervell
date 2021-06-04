import { gql } from '@apollo/client'

import loadingBreadcrumbChannelFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbChannel'
import loadingBreadcrumbUserFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbUser'
import loadingBreadcrumbGroupFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbGroup'

export default gql`
  fragment PrimarySearchResult on QuickSearchResult {
    __typename
    ... on User {
      id
      label: name
      href
    }
    ... on Group {
      id
      label: name
      href
      visibility
    }
    ... on Channel {
      id
      label: title
      href
      visibility
      owner {
        __typename
        ... on User {
          id
          name
        }
        ... on Group {
          id
          name
          visibility
        }
      }
    }
    ...LoadingBreadcrumbChannel
    ...LoadingBreadcrumbGroup
    ...LoadingBreadcrumbUser
  }
  ${loadingBreadcrumbChannelFragment}
  ${loadingBreadcrumbUserFragment}
  ${loadingBreadcrumbGroupFragment}
`
