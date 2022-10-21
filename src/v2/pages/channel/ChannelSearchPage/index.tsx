import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { LoadingPage } from 'v2/components/LoadingPage'
import ErrorAlert from 'v2/components/UI/ErrorAlert'

import Constrain from 'v2/components/UI/Constrain'
import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import {
  ChannelSearchPage as ChannelSearchPageType,
  ChannelSearchPageVariables,
} from '__generated__/ChannelSearchPage'
import ChannelSearchMetadata from './components/ChannelSearchMetadata'
import { ChannelPageMetaTags } from 'v2/pages/channel/components/ChannelPageMetaTags'

import { AdvancedSearchResultsGrid } from 'v2/components/AdvancedSearch/components/AdvancedSearchResultsGrid'
import channelSearchPage from './queries/channelSearchPage'
import { WhereEnum } from '__generated__/globalTypes'
import useLoginStatus from 'v2/hooks/useLoginStatus'

export const ChannelSearchPage: React.FC = () => {
  const { id } = useParams()
  const { isLoggedIn } = useLoginStatus()
  const navigate = useNavigate()

  const { data, loading, error } = useQuery<
    ChannelSearchPageType,
    ChannelSearchPageVariables
  >(channelSearchPage, {
    variables: {
      id,
    },
  })

  useEffect(() => {
    if (!isLoggedIn && data?.channel) {
      navigate(data.channel.href, { state: { background: location } })
    }
  }, [isLoggedIn, id, navigate, data])

  if (loading) {
    return <LoadingPage />
  }

  if (error) {
    return <ErrorAlert isReloadable>{error.message}</ErrorAlert>
  }

  if (!isLoggedIn) {
    return null
  }

  const { channel } = data

  return (
    <TopBarLayout>
      <ChannelPageMetaTags channel={channel} />
      <Constrain>
        <ChannelSearchMetadata channel={channel} />
        <AdvancedSearchResultsGrid
          initialScope={{ where: WhereEnum.CHANNEL, id }}
        />
      </Constrain>
    </TopBarLayout>
  )
}
