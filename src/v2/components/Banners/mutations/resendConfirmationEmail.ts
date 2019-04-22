import gql from 'graphql-tag';

export default gql`
  mutation ResendConfirmationEmail {
    resend_confirmation_email(input: {}) {
      me {
        __typename
        id
      }
    }
  }
`;
