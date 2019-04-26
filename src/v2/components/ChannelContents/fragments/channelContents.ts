import gql from 'graphql-tag'

export default gql`
  fragment ChannelContents on Channel {
    __typename
    id
    skeleton {
      id
      type
    }
    can {
      add_to
    }
  }
`
