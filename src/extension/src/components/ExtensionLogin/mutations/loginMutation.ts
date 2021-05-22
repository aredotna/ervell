import { gql } from '@apollo/client'

export default gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      me {
        id
        authentication_token
      }
    }
  }
`
