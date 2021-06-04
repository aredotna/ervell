import { gql } from '@apollo/client'

export default gql`
  fragment LoadingBreadcrumbUser on User {
    __typename
    id
    label: name
  }
`
