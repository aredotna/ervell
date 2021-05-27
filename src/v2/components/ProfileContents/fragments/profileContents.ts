import { gql } from '@apollo/client'

import konnectableCellFragment from 'v2/components/Cell/components/Konnectable/fragments/konnectableCell'

export default gql`
  fragment ProfileContents on Identifiable {
    ... on User {
      __typename
      id
      name
      contents: kontents(
        type: $type
        per: $per
        page: $page
        direction: DESC
        sort_by: $sort
        q: $q
        seed: $seed
      ) {
        ...KonnectableCell
      }
    }
  }
  ${konnectableCellFragment}
`
