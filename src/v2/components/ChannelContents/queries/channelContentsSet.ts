import gql from 'graphql-tag'

import konnectableCellFragment from 'v2/components/Cell/components/Konnectable/fragments/konnectableCell'

export default gql`
  query ChannelContentsSet($id: ID!, $connectables: [ConnectableInput]!) {
    channel(id: $id) {
      __typename
      id
      contents(connectables: $connectables) {
        ...KonnectableCell
      }
    }
  }
  ${konnectableCellFragment}
`
