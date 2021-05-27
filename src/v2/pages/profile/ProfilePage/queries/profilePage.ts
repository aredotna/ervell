import { gql } from '@apollo/client'

import profilePageIdentifiableFragment from 'v2/pages/profile/ProfilePage/fragments/profilePageIdentifiable'

export default gql`
  query ProfilePage($id: ID!) {
    identity(id: $id) {
      __typename
      identifiable {
        ...ProfilePageIdentifiable
      }
    }
  }
  ${profilePageIdentifiableFragment}
`
