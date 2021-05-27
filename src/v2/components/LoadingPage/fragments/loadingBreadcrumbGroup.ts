import { gql } from '@apollo/client'

export default gql`
  fragment LoadingBreadcrumbGroup on Group {
    __typename
    id
    label: name
  }
`
