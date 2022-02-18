import { gql } from '@apollo/client'

import { profileTableRowFragment } from './profileTableRow'

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
        ...ProfileTableRow
      }
    }
  }
  ${profileTableRowFragment}
`
