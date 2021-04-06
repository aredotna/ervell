import gql from 'graphql-tag'

export default gql`
  query ChannelTableContentsSet($id: ID!) {
    channel(id: $id) {
      __typename
      id
      blokks {
        __typename
        ... on Model {
          created_at(relative: true)
          updated_at(relative: true)
        }

        ... on Attachment {
          file_url
          image_url(size: THUMB)
        }

        ... on Embed {
          embed_html
        }

        ... on Link {
          image_url(size: THUMB)
        }

        ... on Image {
          image_url(size: THUMB)
        }

        ... on Text {
          content(format: HTML)
        }

        ... on ConnectableInterface {
          title
          user {
            name
          }
          connection {
            position
            created_at(relative: true)
            user {
              name
            }
          }
        }
      }
    }
  }
`
