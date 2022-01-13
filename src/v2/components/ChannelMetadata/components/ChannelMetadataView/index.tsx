import React from 'react'
import styled from 'styled-components'

import CookieLinkUnlessCurrent from 'v2/components/UI/CookieLinkUnlessCurrent'
import Text from 'v2/components/UI/Text'

import { ChannelMetadata as Channel } from '__generated__/ChannelMetadata'

type ChannelViewType = 'table' | 'grid'

const BetaBadge = styled(Text).attrs({
  f: 0,
})`
  display: inline-block;
  color: ${props => props.theme.colors.gray.regular} !important;
  font-weight: normal;
  margin-left: 0.5em;

  &:before {
    content: '•';
    margin-right: 0.5em;
  }
`

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
        to={`${channel.href}/grid`}
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
        <BetaBadge>BETA</BetaBadge>
      </CookieLinkUnlessCurrent>
    </div>
  )
}
