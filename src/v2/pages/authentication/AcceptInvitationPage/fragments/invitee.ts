import { gql } from '@apollo/client'

export default gql`
  fragment Invitee on Invitee {
    __typename
    id
    email
  }
`
