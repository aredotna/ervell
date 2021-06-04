import { gql } from '@apollo/client'

export default gql`
  query CouponCodeStatus($code: String!) {
    coupon(code: $code) {
      __typename
      id
      description
      is_valid
    }
  }
`
