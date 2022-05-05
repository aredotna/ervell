import { gql } from '@apollo/client'

export default gql`
  mutation restrictMutation($id: ID!) {
    restrict(input: { id: $id }) {
      user {
        id
      }
    }
  }
`
