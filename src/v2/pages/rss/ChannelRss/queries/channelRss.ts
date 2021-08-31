import { gql } from '@apollo/client'
import RssBlock from 'v2/pages/rss/components/RssBlock/fragments/rssBlock'

export default gql`
  query ChannelRss($id: ID!) {
    channel(id: $id) {
      title
      href(absolute: true)
      description(format: MARKDOWN)
      updated_at
      blocks: blokks(per: 10, sort_by: POSITION, direction: DESC) {
        ...RssBlock
      }
    }
  }
  ${RssBlock}
`
