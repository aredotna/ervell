import { gql } from '@apollo/client'

export default gql`
  mutation CreateCustomerPortalSession {
    create_portal_session(input: {}) {
      url
    }
  }
`
