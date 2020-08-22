import gql from 'graphql-tag'

export default gql`
  mutation ResendConfirmationEmailMutation {
    resend_confirmation_email(input: {}) {
      me {
        __typename
        id
      }
    }
  }
`
