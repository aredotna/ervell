import { useQuery } from '@apollo/client'
import React from 'react'
import {
  ChannelRss as ChannelRssType,
  ChannelRssVariables,
} from '__generated__/ChannelRss'
import { RssBlock } from '../components/RssBlock'
import RssLayout from '../components/RssLayout'
import channelRssQuery from './queries/channelRss'

interface ChannelRssProps {
  params: { slug?: string }
}

const ChannelRss: React.FC<ChannelRssProps> = ({ params }) => {
  const { data } = useQuery<ChannelRssType, ChannelRssVariables>(
    channelRssQuery,
    {
      variables: { id: params.slug },
    }
  )

  if (!data) return null

  const { channel } = data

  return (
    <RssLayout
      title={channel.title}
      link={channel.href}
      atomLink={`${channel.href}/feed/rss`}
      description={channel.description}
      lastBuildDate={channel.updated_at}
    >
      {channel.blocks.map(block => {
        return <RssBlock key={block.id} block={block} />
      })}
    </RssLayout>
  )
}

export default ChannelRss
