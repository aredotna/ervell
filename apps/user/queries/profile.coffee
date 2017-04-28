module.exports = 
  """
  query user($id: ID! $per: Int, $page: Int, $perBlocks: Int) {
    user(id: $id) {
      contents(per: $per, type: "channel", page: $page) {
        title
        updated_at
        user {
          name
        }
        kind {
          __typename
          ... on Channel {
            blocks(per: $perBlocks) {
              id
              title
              description
            }
          }
        }
      }
    }
  }
  """