import { useQuery } from '@apollo/client'
import React from 'react'
import styled from 'styled-components'
import Count from 'v2/components/UI/Count'

import Text from 'v2/components/UI/Text'
import { PrimarySearchChannelCount as PrimarySearchChannelCountType } from '__generated__/PrimarySearchChannelCount'
import { PrimarySearchGroupCount as PrimarySearchGroupCountType } from '__generated__/PrimarySearchGroupCount'
import { PrimarySearchProfileCount as PrimarySearchProfileCountType } from '__generated__/PrimarySearchProfileCount'
import {
  PrimarySearchResult,
  PrimarySearchResult_Channel,
  PrimarySearchResult_Group,
  PrimarySearchResult_User,
} from '__generated__/PrimarySearchResult'
import primarySearchCountQuery from './queries/primarySearchCountChannelQuery'
import primarySearchCountGroupQuery from './queries/primarySearchCountGroupQuery'
import primarySearchCountProfileQuery from './queries/primarySearchCountProfileQuery'

interface PrimarySearchCountProps {
  result: PrimarySearchResult
}

const Label = styled(Text).attrs({
  f: [1],
  color: 'gray.medium',
})`
  text-transform: uppercase;
`

export const PrimarySearchCount: React.FC<PrimarySearchCountProps> = ({
  result,
}) => {
  if (result.__typename === 'Channel') {
    return <PrimarySearchChannelCount result={result} />
  }

  if (result.__typename === 'Group') {
    return <PrimarySearchGroupCount result={result} />
  }

  if (result.__typename === 'User') {
    return <PrimarySearchProfileCount result={result} />
  }

  return null
}

const PrimarySearchChannelCount: React.FC<{
  result: PrimarySearchResult_Channel
}> = ({ result }) => {
  const { data, loading, error } = useQuery<PrimarySearchChannelCountType>(
    primarySearchCountQuery,
    { variables: { id: result.id } }
  )

  if (loading) return null
  if (error) return null

  return (
    <Label>
      <Count amount={data.channel.counts.blocks} label="block" />
    </Label>
  )
}

const PrimarySearchGroupCount: React.FC<{
  result: PrimarySearchResult_Group
}> = ({ result }) => {
  const { data, loading, error } = useQuery<PrimarySearchGroupCountType>(
    primarySearchCountGroupQuery,
    { variables: { id: result.id } }
  )

  if (loading) return null
  if (error) return null

  return (
    <Label>
      <Count amount={data.group.counts.users} label="member" />,{' '}
      <Count amount={data.group.counts.channels} label="channel" />
    </Label>
  )
}

const PrimarySearchProfileCount: React.FC<{
  result: PrimarySearchResult_User
}> = ({ result }) => {
  const { data, loading, error } = useQuery<PrimarySearchProfileCountType>(
    primarySearchCountProfileQuery,
    { variables: { id: result.id } }
  )

  if (loading) return null
  if (error) return null

  return (
    <Label>
      <Count amount={data.user.counts.channels} label="channel" />,{' '}
      <Count amount={data.user.counts.blocks} label="block" />
    </Label>
  )
}
