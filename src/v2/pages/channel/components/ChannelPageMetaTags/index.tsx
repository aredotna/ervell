import React from 'react'

import { ChannelPageMetaTags as ChannelPageMetaTagsData } from '__generated__/ChannelPageMetaTags'

import Title from 'v2/components/UI/Head/components/Title'
import Description from 'v2/components/UI/Head/components/Description'
import Canonical from 'v2/components/UI/Head/components/Canonical'
import Image from 'v2/components/UI/Head/components/Image'

interface Props {
  subtitle?: string
  channel: ChannelPageMetaTagsData
}

export const ChannelPageMetaTags: React.FC<Props> = ({ channel, subtitle }) => {
  const title = [channel.meta_title, subtitle].filter(Boolean).join(' / ')

  return (
    <>
      {title && <Title>{title}</Title>}

      {channel.meta_description && (
        <Description>{channel.meta_description}</Description>
      )}

      {channel.visibility !== 'private' && (
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${title} RSS`}
          href={`${channel.canonical}/feed/rss`}
        />
      )}

      <Canonical>{channel.canonical}</Canonical>

      {channel.image_url && <Image>{channel.image_url}</Image>}
    </>
  )
}
