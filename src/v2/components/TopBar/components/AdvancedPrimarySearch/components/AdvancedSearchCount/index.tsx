import { useQuery } from '@apollo/client'
import React from 'react'
import styled from 'styled-components'
import Count from 'v2/components/UI/Count'

import Text from 'v2/components/UI/Text'
import { AdvancedSearchChannelCount as AdvancedSearchChannelCountType } from '__generated__/AdvancedSearchChannelCount'
import { AdvancedSearchGroupCount as AdvancedSearchGroupCountType } from '__generated__/AdvancedSearchGroupCount'
import { AdvancedSearchProfileCount as AdvancedSearchProfileCountType } from '__generated__/AdvancedSearchProfileCount'
import {
  AdvancedQuickSearchResult,
  AdvancedQuickSearchResult_Channel,
  AdvancedQuickSearchResult_Group,
  AdvancedQuickSearchResult_User,
} from '__generated__/AdvancedQuickSearchResult'
import primarySearchCountQuery from './queries/advancedSearchCountChannelQuery'
import primarySearchCountGroupQuery from './queries/advancedSearchCountGroupQuery'
import primarySearchCountProfileQuery from './queries/advancedSearchCountProfileQuery'

interface AdvancedSearchCountProps {
  result: AdvancedQuickSearchResult
}

const Label = styled(Text).attrs({
  f: [0, 1],
  color: 'gray.medium',
})`
  text-transform: uppercase;
`

export const AdvancedSearchCount: React.FC<AdvancedSearchCountProps> = ({
  result,
}) => {
  if (result.__typename === 'Channel') {
    return <AdvancedSearchChannelCount result={result} />
  }

  if (result.__typename === 'Group') {
    return <AdvancedSearchGroupCount result={result} />
  }

  if (result.__typename === 'User') {
    return <AdvancedSearchProfileCount result={result} />
  }

  return null
}

const AdvancedSearchChannelCount: React.FC<{
  result: AdvancedQuickSearchResult_Channel
}> = ({ result }) => {
  const { data, loading, error } = useQuery<AdvancedSearchChannelCountType>(
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

const AdvancedSearchGroupCount: React.FC<{
  result: AdvancedQuickSearchResult_Group
}> = ({ result }) => {
  const { data, loading, error } = useQuery<AdvancedSearchGroupCountType>(
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

const AdvancedSearchProfileCount: React.FC<{
  result: AdvancedQuickSearchResult_User
}> = ({ result }) => {
  const { data, loading, error } = useQuery<AdvancedSearchProfileCountType>(
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
