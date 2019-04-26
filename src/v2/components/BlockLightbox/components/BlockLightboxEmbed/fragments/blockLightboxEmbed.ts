import gql from 'graphql-tag'

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
