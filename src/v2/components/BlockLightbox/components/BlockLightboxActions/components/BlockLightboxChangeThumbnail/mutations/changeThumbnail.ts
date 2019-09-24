import gql from 'graphql-tag'

export default gql`
  mutation updateBlockThumbnailMutation($id: ID!, $image_url: String!) {
    update_block_thumbnail(input: { id: $id, image_url: $image_url }) {
      blokk {
        __typename
        ... on Model {
          id
        }
      }
    }
  }
`
