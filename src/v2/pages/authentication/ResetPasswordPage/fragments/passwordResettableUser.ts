import { gql } from '@apollo/client'

export default gql`
  fragment PasswordResettableUser on User {
    __typename
    id
  }
`
