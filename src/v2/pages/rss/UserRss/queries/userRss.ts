import { gql } from '@apollo/client'
import RssBlock from 'v2/pages/rss/components/RssBlock/fragments/rssBlock'

export default gql`
  query UserRss($id: ID!) {
    user(id: $id) {
      name
      href(absolute: true)
      contents: kontents(per: 10, sort_by: CREATED_AT) {
        ...RssBlock
      }
    }
  }
  ${RssBlock}
`
