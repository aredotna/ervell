module.exports = 
  """
  query user($id: ID! $per: Int, $page: Int, $perBlocks: Int) {
    user(id: $id) {
      contents(per: $per, type: "channel", page: $page) {
        title
        updated_at(relative: true)
        user {
          name
        }
        kind {
          __typename
          ... on Channel {
            href
            visibility
            counts {
              blocks
            }
            blocks(per: $perBlocks, sort_by: UPDATED_AT, direction: DESC) {
              ... blockThumb
            }
          }
        }
      }
    }
  }

  #{require '../../../components/block_v2/queries/block.coffee'}
  """