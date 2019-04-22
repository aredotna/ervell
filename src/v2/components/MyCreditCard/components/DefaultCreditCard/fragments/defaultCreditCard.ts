import gql from 'graphql-tag';

export default gql`
  fragment DefaultCreditCard on CreditCard {
    __typename
    id
    brand
    last4
    exp_year
    exp_month
  }
`;
