import { useQuery } from '@apollo/client'
import React from 'react'
import { DescriptiveCarousel } from 'v2/components/FeatureSlides'
import {
  CommunityAPIContents,
  CommunityAPIContents_channel_blokks_Link,
} from '__generated__/CommunityAPIContents'
import { CommunityAPIQuery } from './queries/communityApiQuery'

export const CommunityApiProjects: React.FC = () => {
  const { data, loading } = useQuery<CommunityAPIContents>(CommunityAPIQuery)

  if (loading) {
    return null
  }

  const slides = data?.channel.blokks.map(block => {
    const typedBlock = block as CommunityAPIContents_channel_blokks_Link
    return {
      id: block.id.toString(),
      headline: typedBlock.title,
      copy: typedBlock.description,
      image: typedBlock.image_url,
      link: typedBlock.source_url,
    }
  })

  return <DescriptiveCarousel slides={slides} />
}
