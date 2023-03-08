import { gql } from '@apollo/client'

import konnectableCellFragment from 'v2/components/Cell/components/Konnectable/fragments/konnectableCell'

export const channelContentsConnectableFragment = gql`
  fragment ChannelContentsConnectable on Konnectable {
    ...KonnectableCell
  }
  ${konnectableCellFragment}
`
