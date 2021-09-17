import { gql } from '@apollo/client'

import fullBlockActionsFragment from 'v2/components/FullBlock/components/FullBlockActions/fragments/fullBlockActions'
import manageBlockFragment from 'v2/components/ManageBlock/fragments/manageBlock'

export default gql`
  fragment FullBlockMetadataPane on Konnectable {
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
    ...FullBlockActions
    ...ManageBlock
  }
  ${fullBlockActionsFragment}
  ${manageBlockFragment}
`
