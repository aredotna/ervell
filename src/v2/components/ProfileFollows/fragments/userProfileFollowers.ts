import { gql } from '@apollo/client'

import identifiableCellFragment from 'v2/components/Cell/components/Identifiable/fragments/identifiableCell'

export default gql`
  fragment UserProfileFollowers on User {
    __typename
    id
    followers(page: $page, per: $per) {
      ...IdentifiableCell
    }
  }
  ${identifiableCellFragment}
`
