import gql from 'graphql-tag'

export const addBlockFragment = gql`
  fragment AddBlock on Channel {
    can {
      add_to
    }
    visibility
  }
`
