import React from 'react'

import { ChannelMetadata as Channel } from '__generated__/ChannelMetadata'

import CookieLinkUnlessCurrent from 'v2/components/UI/CookieLinkUnlessCurrent'

type ChannelViewType = 'table' | 'grid'

interface ChannelMetadataConnectionsProps {
  channel: Channel
  view?: ChannelViewType
}

export const ChannelMetadataView: React.FC<ChannelMetadataConnectionsProps> = ({
  channel,
  view,
}) => {
  const isViewActive = (v: ChannelViewType) => () => view === v
  v => () => view === v
  return (
    <div>
      <CookieLinkUnlessCurrent
        name="view"
        value="grid"
        prefix={`Channel.${channel.slug}`}
        to={`${channel.href}`}
        isActive={isViewActive('grid')}
      >
        Grid
      </CookieLinkUnlessCurrent>
      <CookieLinkUnlessCurrent
        name="view"
        value="table"
        prefix={`Channel.${channel.slug}`}
        to={`${channel.href}/table`}
        isActive={isViewActive('table')}
      >
        Table
      </CookieLinkUnlessCurrent>
    </div>
  )
}
