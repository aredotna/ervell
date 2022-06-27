import React from 'react'
import { useQuery } from '@apollo/client'
import channelUiState from './queries/channelUiState'
import {
  ChannelUiState,
  ChannelUiStateVariables,
} from '__generated__/ChannelUiState'
import ChannelTablePage from '../ChannelTablePage'
import ChannelPage from '../ChannelPage'
import useSerializedMe from 'v2/hooks/useSerializedMe'
import { useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { ConnectableTypeEnum } from '__generated__/globalTypes'

const isClientSide = typeof window !== 'undefined'

const ChannelPageWrapper: React.FC<{ view?: string }> = ({ view }) => {
  const params = useParams()
  const [query] = useSearchParams()

  const { data } = useQuery<ChannelUiState, ChannelUiStateVariables>(
    channelUiState,
    {
      fetchPolicy: isClientSide ? 'cache-only' : 'network-only',
      variables: { viewName: `Channel.${params.id}--view` },
    }
  )

  const { is_premium } = useSerializedMe()

  const cookies = (data && data.cookies) || {
    view: 'grid',
  }

  const calcView = params.view || cookies.view || 'grid'
  const type = query.get('type') || null
  const user = query.get('user') ? JSON.parse(query.get('user')) : null
  const fromOnboarding = Boolean(query.get('fromOnboarding'))

  if (view === 'table' && is_premium) {
    return (
      <ChannelTablePage
        id={params.id}
        view="table"
        type={type as ConnectableTypeEnum}
        user={user}
        fromOnboarding={fromOnboarding}
      />
    )
  }

  return (
    <ChannelPage
      id={params.id}
      view={calcView as 'grid' | 'table'}
      fromOnboarding={fromOnboarding}
    />
  )
}

export default ChannelPageWrapper
