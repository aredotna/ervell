import { gql } from '@apollo/client'

import blockLightboxActionsFragment from 'v2/components/BlockLightbox/components/BlockLightboxActions/fragments/blockLightboxActions'
import manageBlockFragment from 'v2/components/ManageBlock/fragments/manageBlock'

export default gql`
  fragment BlockLightboxMetadataPane on Konnectable {
    ... on Model {
      created_at_unix_time: created_at(format: "%s")
      created_at_timestamp: created_at
      created_at(relative: true)
      updated_at(relative: true)
      updated_at_timestamp: updated_at
    }
    ... on ConnectableInterface {
      title
      description(format: HTML)
      user {
        __typename
        id
        name
        href
      }
    }
    ... on Block {
      can {
        manage
        comment
      }
    }
    ...BlockLightboxActions
    ...ManageBlock
  }
  ${blockLightboxActionsFragment}
  ${manageBlockFragment}
`
