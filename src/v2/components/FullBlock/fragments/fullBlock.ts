import { gql } from '@apollo/client'

import fullBlockMetadataPaneFragment from 'v2/components/FullBlock/components/FullBlockMetadataPane/fragments/fullBlockMetadataPane'
import fullBlockContentPaneFragment from 'v2/components/FullBlock/components/FullBlockContentPane/fragments/fullBlockContentPane'

export default gql`
  fragment FullBlock on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on ConnectableInterface {
      title
    }
    ...FullBlockContentPane
    ...FullBlockMetadataPane
  }
  ${fullBlockContentPaneFragment}
  ${fullBlockMetadataPaneFragment}
`
