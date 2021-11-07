import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'

import {
  ChannelPage as ChannelPageData,
  ChannelPageVariables,
} from '__generated__/ChannelPage'

import channelPageQuery from 'v2/pages/channel/ChannelPage/queries/channelPage'

import Constrain from 'v2/components/UI/Constrain'
import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import ChannelMetadata from 'v2/components/ChannelMetadata'

import { ChannelPageMetaTags } from 'v2/pages/channel/components/ChannelPageMetaTags'
import { LoadingPage } from 'v2/components/LoadingPage'

import Modal from 'v2/components/UI/Modal'
import ModalDialog from 'v2/components/UI/ModalDialog'
import IntroduceChannel from 'v2/components/Onboarding/components/Channels/components/IntroduceChannel'
import { ChannelTableQuery } from 'v2/components/ChannelTableContents'
// import { ChannelTableQuery } from 'v2/components/ChannelTableContents/indexDevPaginatedVersion'

const Dialog = styled(ModalDialog).attrs({
  width: 'auto',
  height: 'auto',
  maxHeight: '100%',
  maxWidth: '100%',
})``

interface ChannelTablePageProps {
  id: string
  fromOnboarding?: boolean
}

export const ChannelTablePage: React.FC<ChannelTablePageProps> = ({
  id,
  fromOnboarding,
}) => {
  useEffect(() => {
    if (fromOnboarding) {
      const modal = new Modal(IntroduceChannel, {}, { Dialog })
      modal.open()
    }
  }, [fromOnboarding])

  const { data, loading, error } = useQuery<
    ChannelPageData,
    ChannelPageVariables
  >(channelPageQuery, {
    variables: { id },
  })

  let pageJsx: React.ReactNode | null = null
  if (loading || !data?.channel) {
    pageJsx = <LoadingPage />
  } else if (error) {
    pageJsx = <ErrorAlert isReloadable>{error.message}</ErrorAlert>
  } else {
    pageJsx = (
      <>
        <ChannelPageMetaTags channel={data.channel} />
        <ChannelMetadata channel={data.channel} />

        <ChannelTableQuery id={data.channel.id.toString()} />
      </>
    )
  }

  return (
    <TopBarLayout>
      <Constrain>{pageJsx}</Constrain>
    </TopBarLayout>
  )
}

export default ChannelTablePage
