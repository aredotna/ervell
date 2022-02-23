import { useQuery } from '@apollo/client'
import React from 'react'
import { EmbeddedChannelContents } from 'v2/pages/channel/EmbeddedChannelPage/components/EmbeddedChannelContents'
import {
  ExpandedChannelRowContents as ExpandedChannelRowContentsType,
  ExpandedChannelRowContentsVariables,
} from '__generated__/ExpandedChannelRowContents'
import expandedChannelRowContentsQuery from './queries/expandedChannelRowContents'

interface ExpandedChannelRowContentsProps {
  id: number
}

export const ExpandedChannelRowContents: React.FC<ExpandedChannelRowContentsProps> = ({
  id,
}) => {
  const { data, loading, error } = useQuery<
    ExpandedChannelRowContentsType,
    ExpandedChannelRowContentsVariables
  >(expandedChannelRowContentsQuery, { variables: { id: id.toString() } })

  if (loading || error) return null
  return <EmbeddedChannelContents channel={data.channel} />
}
