import { gql } from '@apollo/client'

export default gql`
  query UserInfoQuery {
    me {
      __typename
      name
    }
  }
`
