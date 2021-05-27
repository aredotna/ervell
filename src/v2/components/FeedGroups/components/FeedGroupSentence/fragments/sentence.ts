import { gql } from '@apollo/client'

import feedObjectFragment from 'v2/components/FeedGroups/components/FeedGroupSentence/fragments/object'
import loadingBreadcrumbUserFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbUser'
import loadingBreadcrumbGroupFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbGroup'

export default gql`
  fragment FeedGroupSentence on DeedGroup {
    __typename
    id: key
    key
    length
    user {
      __typename
      id
      label: name
      name
      href
      ...LoadingBreadcrumbUser
    }
    owner {
      __typename
      ... on User {
        id
        label: name
        name
        href
        ...LoadingBreadcrumbUser
      }
      ... on Group {
        id
        label: name
        name
        ...LoadingBreadcrumbGroup
      }
    }
    action
    item {
      ...FeedObject
    }
    item_phrase(truncate: 100)
    connector
    target {
      ...FeedObject
    }
    target_phrase
    created_at(relative: true)
    is_private
  }
  ${feedObjectFragment}
  ${loadingBreadcrumbUserFragment}
  ${loadingBreadcrumbGroupFragment}
`
