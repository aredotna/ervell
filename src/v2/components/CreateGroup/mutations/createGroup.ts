import { gql } from '@apollo/client'

export default gql`
  mutation createGroupMutation($name: String!, $description: String) {
    create_group(input: { name: $name, description: $description }) {
      group {
        id
        href
      }
    }
  }
`
