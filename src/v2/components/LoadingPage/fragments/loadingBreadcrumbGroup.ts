import gql from 'graphql-tag'

export default gql`
  fragment LoadingBreadcrumbGroup on Group {
    __typename
    id
    label: name
  }
`
