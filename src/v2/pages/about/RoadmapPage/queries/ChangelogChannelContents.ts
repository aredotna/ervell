import gql from 'graphql-tag'

export const ChangelogChannelContents = gql`
  query ChangelogChannelContents($id: ID!) {
    channel(id: $id) {
      __typename
      id
      title
    }
  }
}
`
