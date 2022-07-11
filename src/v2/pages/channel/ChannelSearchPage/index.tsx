import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router'
import { LoadingPage } from 'v2/components/LoadingPage'
import ErrorAlert from 'v2/components/UI/ErrorAlert'

import Constrain from 'v2/components/UI/Constrain'
import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import {
  ChannelSearchPage as ChannelSearchPageType,
  ChannelSearchPageVariables,
} from '__generated__/ChannelSearchPage'
import channelSearchPage from './queries/channelSearchPage'
import ChannelSearchMetadata from './components/ChannelSearchMetadata'
import { AdvancedSearchContextProvider } from 'v2/components/AdvancedSearch/AdvancedSearchContext'
import { WhereEnum } from '__generated__/globalTypes'
import { AdvancedSearchResultsGrid } from 'v2/components/AdvancedSearch/components/AdvancedSearchResultsGrid'

export const ChannelSearchPage: React.FC = () => {
  const { id } = useParams()

  const { data, loading, error } = useQuery<
    ChannelSearchPageType,
    ChannelSearchPageVariables
  >(channelSearchPage, {
    variables: {
      id,
    },
  })

  if (loading) {
    return <LoadingPage />
  }

  if (error) {
    return <ErrorAlert isReloadable>{error.message}</ErrorAlert>
  }

  const { channel } = data

  return (
    <TopBarLayout>
      <AdvancedSearchContextProvider
        variables={{ where: { facet: WhereEnum.CHANNEL, id } }}
      >
        <Constrain>
          <ChannelSearchMetadata channel={channel} />
          <AdvancedSearchResultsGrid />
        </Constrain>
      </AdvancedSearchContextProvider>
    </TopBarLayout>
  )
}
