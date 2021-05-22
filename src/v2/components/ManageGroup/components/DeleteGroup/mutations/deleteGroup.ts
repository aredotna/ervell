import { gql } from '@apollo/client'

export default gql`
  mutation deleteGroupMutation($id: ID!) {
    delete_group(input: { id: $id }) {
      status
    }
  }
`
