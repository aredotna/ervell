import { useQuery } from '@apollo/client'
import React from 'react'
import { ExploreRss as ExploreRssType } from '__generated__/ExploreRss'
import { RssBlock } from '../components/RssBlock'
import RssLayout from '../components/RssLayout'
import exploreRssQuery from './queries/exploreRss'

interface ExploreRssProps {
  params: any
}

const ExploreRss: React.FC<ExploreRssProps> = () => {
  const { data } = useQuery<ExploreRssType>(exploreRssQuery)

  if (!data) return null

  const { exxplore } = data

  return (
    <RssLayout
      title="Are.na / Explore"
      link="https://www.are.na/explore"
      atomLink="https://www.are.na/explore/feed/rss"
      lastBuildDate={exxplore[0].updated_at}
    >
      {exxplore.map(block => {
        return <RssBlock key={block.id} block={block} />
      })}
    </RssLayout>
  )
}

export default ExploreRss
