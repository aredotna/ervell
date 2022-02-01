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

const isClientSide = typeof window !== 'undefined'

export default ({ params, query }) => {
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

  const view = params.view || cookies.view || 'grid'
  const type = query.type || null
  const user = query.user ? JSON.parse(query.user) : null
  const fromOnboarding = query.fromOnboarding

  if (view === 'table' && is_premium) {
    return (
      <ChannelTablePage
        id={params.id}
        view={view}
        type={type}
        user={user}
        fromOnboarding={fromOnboarding}
      />
    )
  }

  return (
    <ChannelPage id={params.id} view={view} fromOnboarding={fromOnboarding} />
  )
}
