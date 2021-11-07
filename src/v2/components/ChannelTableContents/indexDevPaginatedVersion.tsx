import React from 'react'
import { usePaginatedBlocks } from 'v2/hooks/usePaginatedBlocks'

import {
  ChannelTableContentsSet,
  ChannelTableContentsSetVariables,
} from '__generated__/ChannelTableContentsSet'

import CHANNEL_TABLE_CONTENTS_QUERY from './queries/ChannelTableContents'
import { ChannelTableContents } from './components/ChannelTableContents'

interface ChannelTableQueryProps {
  id: string
}

export const ChannelTableQuery: React.FC<ChannelTableQueryProps> = ({ id }) => {
  const { blocks } = usePaginatedBlocks<
    ChannelTableContentsSet,
    ChannelTableContentsSetVariables
  >({
    channelQuery: CHANNEL_TABLE_CONTENTS_QUERY,
    channelId: id,
    per: 25,
  })

  return (
    <ChannelTableContents
      blocks={blocks}
      setSort={() => {}}
      setDirection={() => {}}
    />
  )
}
