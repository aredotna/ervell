import { gql } from '@apollo/client'

import konnectableDisplayFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableDisplay/fragments/konnectableDisplay'
import konnectableMetadataFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableMetadata/fragments/konnectableMetadata'
import konnectableBlockOverlayFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableBlockOverlay/fragments/konnectableBlockOverlay'

export default gql`
  fragment KonnectableCell on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on ConnectableInterface {
      href
    }
    ... on Block {
      counts {
        comments
      }
    }
    ...KonnectableDisplay
    ...KonnectableMetadata
    ...KonnectableBlockOverlay
    ...LoadingBreadcrumbChannel
  }
  ${konnectableDisplayFragment}
  ${konnectableMetadataFragment}
  ${konnectableBlockOverlayFragment}
`
