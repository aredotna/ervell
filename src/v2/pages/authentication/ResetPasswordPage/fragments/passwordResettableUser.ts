import gql from 'graphql-tag'

export default gql`
  fragment PasswordResettableUser on User {
    __typename
    id
  }
`
