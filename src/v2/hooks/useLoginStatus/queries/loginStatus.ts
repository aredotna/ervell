import { gql } from '@apollo/client'

export default gql`
  query IsLoggedInQueryHook {
    loginStatus @client {
      isLoggedIn
    }
  }
`
