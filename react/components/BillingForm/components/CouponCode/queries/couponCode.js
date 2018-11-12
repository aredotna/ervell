import gql from 'graphql-tag';

export default gql`
  query CouponCode($code: String!) {
    coupon(code: $code) {
      __typename
      id
      description
    }
  }
`;
