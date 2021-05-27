import { gql } from '@apollo/client'
import loadingBreadcrumbChannel from 'v2/components/LoadingPage/fragments/loadingBreadcrumbChannel'

export default gql`
  fragment CompactChannel on Channel {
    __typename
    id
    href
    visibility
    title
    owner {
      ... on Group {
        __typename
        id
        name
        visibility
      }
      ... on User {
        __typename
        id
        name
      }
    }
    counts {
      contents
    }
    ...LoadingBreadcrumbChannel
  }
  ${loadingBreadcrumbChannel}
`
