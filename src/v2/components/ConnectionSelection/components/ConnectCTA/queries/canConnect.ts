import { gql } from '@apollo/client'

export const canConnectChannelQuery = gql`
  query CanConnectChannelQuery($id: ID!) {
    connectable: channel(id: $id) {
      __typename
      id
      can {
        connect
      }
    }
  }
`
export const canConnectBlockQuery = gql`
  query CanConnectBlockQuery($id: ID!) {
    connectable: blokk(id: $id) {
      __typename
      ... on Model {
        id
      }
      ... on Block {
        can {
          connect
        }
      }
      ... on Channel {
        can {
          connect
        }
      }
    }
  }
`
