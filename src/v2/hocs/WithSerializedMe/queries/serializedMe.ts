import { gql } from '@apollo/client'

export default gql`
  query SerializeMeQuery {
    serializedMe @client {
      __typename
      id
      name
      initials
      avatar
      authentication_token
      is_premium
    }
  }
`
