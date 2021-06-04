import { gql } from '@apollo/client'

export default gql`
  query ChannelTableContentsSet($id: ID!) {
    channel(id: $id) {
      __typename
      id
      blokks {
        __typename
        ... on Block {
          counts {
            public_channels
          }
        }

        ... on Channel {
          visibility
          title
          counts {
            connected_to_channels
            contents
          }
        }

        ... on Model {
          created_at(relative: true)
          updated_at(relative: true)
        }

        ... on Attachment {
          file_url
          image_url(size: THUMB)
          source {
            url
            provider_url
          }
        }

        ... on Embed {
          embed_html
          image_url(size: THUMB)
          source {
            url
            provider_url
          }
        }

        ... on Link {
          image_url(size: THUMB)
          source {
            url
            provider_url
          }
        }

        ... on Image {
          image_url(size: THUMB)
          source {
            url
            provider_url
          }
        }

        ... on Text {
          content(format: MARKDOWN)
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
