import gql from 'graphql-tag'

import memberAvatarFragment from 'v2/components/MemberAvatar/fragments/memberAvatar'
import loadingBreadcrumbUserFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbChannel'
import loadingBreadcrumbGroupFragment from 'v2/components/LoadingPage/fragments/loadingBreadcrumbChannel'

export default gql`
  fragment IdentifiableCell on Identifiable {
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
      visibility
      ...LoadingBreadcrumbGroup
    }
    ...MemberAvatar
  }
  ${memberAvatarFragment}
  ${loadingBreadcrumbUserFragment}
  ${loadingBreadcrumbGroupFragment}
`
