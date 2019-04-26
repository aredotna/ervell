import gql from 'graphql-tag'

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
