import gql from 'graphql-tag'

export default gql`
  mutation restrictMutation($id: ID!) {
    restrict(input: { id: $id }) {
      user {
        id
      }
    }
  }
`
