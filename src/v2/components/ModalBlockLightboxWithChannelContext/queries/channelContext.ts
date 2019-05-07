import gql from 'graphql-tag'

export default gql`
  query ChannelContext($id: ID!) {
    channel(id: $id) {
      __typename
      id
      skeleton(type: BLOCK) {
        __typename
        id
        type
      }
    }
  }
`
