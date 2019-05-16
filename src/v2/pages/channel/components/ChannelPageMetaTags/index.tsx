import React from 'react'

import { ChannelPageMetaTags as ChannelPageMetaTagsData } from '__generated__/ChannelPageMetaTags'

import Title from 'v2/components/UI/Head/components/Title'
import Description from 'v2/components/UI/Head/components/Description'
import Canonical from 'v2/components/UI/Head/components/Canonical'

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

      <Canonical>{channel.canonical}</Canonical>
    </>
  )
}
