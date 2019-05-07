import gql from 'graphql-tag'

import selectableChannelFragment from 'v2/components/ConnectionSelectionList/components/SelectableChannel/fragments/selectableChannel'

export default gql`
  mutation createPrivateChannelMutation($title: String!) {
    create_channel(input: { title: $title, visibility: PRIVATE }) {
      clientMutationId
      channel {
        ...SelectableChannel
      }
    }
  }
  ${selectableChannelFragment}
`
