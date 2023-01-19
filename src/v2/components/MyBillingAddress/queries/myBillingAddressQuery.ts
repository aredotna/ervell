import { gql } from '@apollo/client'

export default gql`
  query MyBillingAddressQuery {
    me {
      __typename
      id
      name
      customer {
        __typename
        id
        address {
          __typename
          line1
          line2
          country
          city
          state
          postal_code
        }
      }
    }
  }
`
