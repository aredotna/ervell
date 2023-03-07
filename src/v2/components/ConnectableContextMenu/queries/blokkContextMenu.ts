import { gql } from '@apollo/client'

import { connectableContextMenuConnectableFragment } from 'v2/components/ConnectableContextMenu/fragments/connectableContextMenu'

export const blokkContextMenu = gql`
  query BlokkContextMenu($id: ID!) {
    blokk(id: $id) {
      __typename
      ...ConnectableContextMenuConnectable
    }
  }
  ${connectableContextMenuConnectableFragment}
`
