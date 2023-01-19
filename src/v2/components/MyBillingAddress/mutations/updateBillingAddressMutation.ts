import { gql } from '@apollo/client'

export default gql`
  mutation UpdateBillingAddressMutation(
    $line1: String
    $line2: String
    $city: String
    $postal_code: String
    $country: String
    $state: String
  ) {
    update_address(
      input: {
        line1: $line1
        line2: $line2
        city: $city
        postal_code: $postal_code
        country: $country
        state: $state
      }
    ) {
      customer {
        id
        address {
          postal_code
          country
        }
      }
    }
  }
`
