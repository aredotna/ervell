import { gql } from '@apollo/client'

export default gql`
  query IsConfirmed {
    me {
      id
      is_confirmed
    }
  }
`
