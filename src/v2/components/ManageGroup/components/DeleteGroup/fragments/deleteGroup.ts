import { gql } from '@apollo/client'

export default gql`
  fragment DeleteGroup on Group {
    id
    name
  }
`
