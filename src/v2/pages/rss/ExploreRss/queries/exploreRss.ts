import { gql } from '@apollo/client'
import RssBlock from 'v2/pages/rss/components/RssBlock/fragments/rssBlock'

export default gql`
  query ExploreRss {
    exxplore(sort_by: CREATED_AT, per: 10) {
      ...RssBlock
    }
  }
  ${RssBlock}
`
