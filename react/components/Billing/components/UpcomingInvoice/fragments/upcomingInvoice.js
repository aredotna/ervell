import gql from 'graphql-tag';

export default gql`
  fragment UpcomingInvoice on Customer {
    upcoming_invoice {
      __typename
      subtotal
      total
      next_payment_attempt_at(format: "%D")
    }
  }
`;
