import gql from 'graphql-tag';

export default gql`
  fragment MyCreditCards on Customer {
    __typename
    id
    default_credit_card {
      __typename
      id
    }
    credit_cards {
      __typename
      id
      brand
      last4
      exp_year
      exp_month
    }
  }
`;
