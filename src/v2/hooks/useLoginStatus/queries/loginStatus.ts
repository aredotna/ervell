import gql from 'graphql-tag'

export default gql`
  query IsLoggedInQueryHook {
    loginStatus @client {
      isLoggedIn
    }
  }
`
