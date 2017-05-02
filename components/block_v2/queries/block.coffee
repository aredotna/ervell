module.exports = 
  """
  fragment blockThumb on Block {
    id
    title
    description
    created_at(relative: true)
    updated_at(relative: true)
    user {
      name
    }
    kind {
      __typename
      ... on Embed {
        image_url
        embed_html
      }
      ... on Image {
        image_url
      }
      ... on Text {
        content
      }
      ... on Link {
        image_url
        source_url
      }
      ... on Attachment {
        file_url
      }
    }
  }
  
  """