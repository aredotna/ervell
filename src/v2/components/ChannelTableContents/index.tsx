import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import {
  ChannelTableContentsSet,
  ChannelTableContentsSetVariables,
} from '__generated__/ChannelTableContentsSet'
import { SortDirection, Sorts } from '__generated__/globalTypes'

import CHANNEL_TABLE_CONTENTS_QUERY from './queries/ChannelTableContents'
import { ChannelTableContents } from './components/ChannelTableContents'

interface ChannelTableQueryProps {
  id: string
}

const devOnItemIntersected = () => {}

export const ChannelTableQuery: React.FC<ChannelTableQueryProps> = ({ id }) => {
  const [sort, setSort] = useState<Sorts | null>(null)
  const [direction, setDirection] = useState<SortDirection | null>(null)

  const { data } = useQuery<
    ChannelTableContentsSet,
    ChannelTableContentsSetVariables
  >(CHANNEL_TABLE_CONTENTS_QUERY, {
    variables: {
      id,
      per: 25,
      page: 1,
      sort,
      direction,
    },
  })

  return (
    <ChannelTableContents
      blocks={data?.channel?.blokks ?? []}
      setSort={setSort}
      setDirection={setDirection}
      onItemIntersected={devOnItemIntersected}
    />
  )
}
