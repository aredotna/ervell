module.exports = """
  query user($id: ID! $per: Int, $page: Int, $perBlocks: Int, $q: String,  $sort: SearchSorts, $seed: Int) {
    user(id: $id) {
      contents(per: $per, type: "channel", page: $page, q: $q, sort_by: $sort, seed: $seed) {
        title(truncate: 50)
        updated_at(relative: true)
        user {
          name
        }
        id
        href
        kind {
          __typename
          ... on Channel {
            visibility
            counts {
              blocks
            }
            blocks(per: $perBlocks, sort_by: POSITION, direction: DESC, type: BLOCK) {
              ... blockThumb
            }
          }
        }
      }
    }
  }

  #{require '../../../components/block_v2/queries/block.coffee'}
"""
