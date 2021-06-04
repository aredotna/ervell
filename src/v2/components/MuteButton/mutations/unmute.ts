import { gql } from '@apollo/client'

import mutableFragment from 'v2/components/MuteButton/fragments/mutable'

export default gql`
  mutation UnmuteMutation($id: ID!, $type: MutableTypeEnum!) {
    __typename
    unmute(input: { id: $id, type: $type }) {
      __typename
      mutable {
        ...Mutable
      }
    }
  }
  ${mutableFragment}
`
