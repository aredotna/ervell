import { gql } from '@apollo/client'

export default gql`
  fragment InitialExtensionDataFragment on Query {
    loginStatus {
      isLoggedIn
    }
  }
`
