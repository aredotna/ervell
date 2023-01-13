import { gql } from '@apollo/client'

export default gql`
  query CustomerAddress {
    me {
      customer {
        address {
          __typename
          line1
          line2
          city
          state
          postal_code
          country
        }
      }
    }
  }
`
