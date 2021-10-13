import { gql } from '@apollo/client'

export default gql`
  mutation ToggleConnectionExpandedMutation($id: ID!) {
    toggle_connection_selection(input: { id: $id }) {
      connection {
        __typename
        id
        selected
      }
    }
  }
`
