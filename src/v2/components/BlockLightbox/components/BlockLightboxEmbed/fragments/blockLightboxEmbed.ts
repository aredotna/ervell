import { gql } from '@apollo/client'

export default gql`
  fragment BlockLightboxEmbed on Konnectable {
    ... on Embed {
      id
      title
      embed_html
      embed_width
      embed_height
    }
  }
`
