import gql from 'graphql-tag'

export default gql`
  fragment LoadingBreadcrumbUser on User {
    __typename
    id
    label: name
  }
`
