module.exports = """
  fragment blockThumb on Block {
    id
    title
    description
    klass
    created_at(relative: true)
    updated_at(relative: true)
    user {
      name
    }
    href
    kind {
      __typename
      ... on Channel {
        visibility
        counts {
          blocks
        }
      }
      ... on Embed {
        image_url
        embed_html
        source_url
      }
      ... on Image {
        image_url
      }
      ... on Text {
        content(format: HTML, no_links: true)
      }
      ... on Link {
        image_url
        source_url
      }
      ... on Attachment {
        file_extension
        file_url
        image_url
      }
    }
  }
"""
