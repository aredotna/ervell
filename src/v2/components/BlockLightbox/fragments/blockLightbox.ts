import { gql } from '@apollo/client'

import blockLightboxMetadataPaneFragment from 'v2/components/BlockLightbox/components/BlockLightboxMetadataPane/fragments/blockLightboxMetadataPane'
import blockLightboxContentPaneFragment from 'v2/components/BlockLightbox/components/BlockLightboxContentPane/fragments/blockLightboxContentPane'

export default gql`
  fragment BlockLightbox on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on ConnectableInterface {
      title
    }
    ...BlockLightboxContentPane
    ...BlockLightboxMetadataPane
  }
  ${blockLightboxContentPaneFragment}
  ${blockLightboxMetadataPaneFragment}
`
