import gql from 'graphql-tag'

export default gql`
  fragment Avatar on Me {
    __typename
    id
    avatar(size: LARGE)
  }
`
