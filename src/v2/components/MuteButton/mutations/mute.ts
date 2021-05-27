import { gql } from '@apollo/client'

import mutableFragment from 'v2/components/MuteButton/fragments/mutable'

export default gql`
  mutation MuteMutation($id: ID!, $type: MutableTypeEnum!) {
    __typename
    mute(input: { id: $id, type: $type }) {
      __typename
      mutable {
        ...Mutable
      }
    }
  }
  ${mutableFragment}
`
