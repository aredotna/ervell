import React from 'react'

import { ChannelPageMetaTags as ChannelPageMetaTagsData } from '__generated__/ChannelPageMetaTags'

import Title from 'v2/components/UI/Head/components/Title'
import Head from 'v2/components/UI/Head'
import Description from 'v2/components/UI/Head/components/Description'
import Canonical from 'v2/components/UI/Head/components/Canonical'
import Image from 'v2/components/UI/Head/components/Image'

interface Props {
  subtitle?: string
  channel: ChannelPageMetaTagsData
  doNotIndex?: boolean
}

export const ChannelPageMetaTags: React.FC<Props> = ({
  channel,
  subtitle,
  doNotIndex,
}) => {
  const title = [channel.meta_title, subtitle].filter(Boolean).join(' / ')

  console.log({ channel })

  return (
    <>
      {title && <Title>{title}</Title>}

      {channel.meta_description && (
        <Description>{channel.meta_description}</Description>
      )}

      <Head>
        {((channel.owner.__typename == 'User' && !channel.owner.is_indexable) ||
          doNotIndex) && <meta name="robots" content="none" />}

        {channel.visibility !== 'private' && (
          <link
            rel="alternate"
            type="application/rss+xml"
            title={`${title} RSS`}
            href={`${channel.canonical}/feed/rss`}
          />
        )}
      </Head>

      <Canonical>{channel.canonical}</Canonical>

      {channel.image_url && <Image>{channel.image_url}</Image>}
    </>
  )
}
