import { useQuery } from '@apollo/client'
import React from 'react'
import sharify from 'sharify'

import { ExploreRss as ExploreRssType } from '__generated__/ExploreRss'
import { RssBlock } from '../components/RssBlock'
import RssLayout from '../components/RssLayout'
import exploreRssQuery from './queries/exploreRss'

const {
  data: { APP_URL },
} = sharify

const ExploreRss: React.FC = () => {
  // const params = useParams()
  const { data } = useQuery<ExploreRssType>(exploreRssQuery)

  if (!data) return null

  const { exxplore } = data

  return (
    <RssLayout
      title="Are.na / Explore"
      link={`${APP_URL}/explore`}
      atomLink={`${APP_URL}/explore/feed/rss`}
      lastBuildDate={exxplore[0].updated_at}
    >
      {exxplore.map(block => {
        return <RssBlock key={block.id} block={block} />
      })}
    </RssLayout>
  )
}

export default ExploreRss
