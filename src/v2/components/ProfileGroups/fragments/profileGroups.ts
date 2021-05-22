import { gql } from '@apollo/client'

import identifiableCellFragment from 'v2/components/Cell/components/Identifiable/fragments/identifiableCell'

export default gql`
  fragment ProfileGroups on User {
    __typename
    id
    groups(page: $page, per: $per) {
      ...IdentifiableCell
    }
  }
  ${identifiableCellFragment}
`
