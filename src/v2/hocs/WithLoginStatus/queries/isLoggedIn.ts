import { gql } from '@apollo/client'

export default gql`
  query IsLoggedInQuery {
    loginStatus @client {
      isLoggedIn
    }
  }
`
