import React, { useEffect } from 'react'
import { Query } from '@apollo/client/react/components'
import styled from 'styled-components'

import { ChannelPage as ChannelPageData } from '__generated__/ChannelPage'

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

interface Variables {
  id: string
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

  return (
    <TopBarLayout>
      <Constrain>
        <Query<ChannelPageData, Variables>
          query={channelPageQuery}
          variables={{ id }}
        >
          {({ data, loading, error }) => {
            if (loading) {
              return <LoadingPage />
            }

            if (error) {
              return <ErrorAlert isReloadable>{error.message}</ErrorAlert>
            }

            const { channel } = data

            return (
              <>
                <ChannelPageMetaTags channel={channel} />
                <ChannelMetadata channel={channel} />

                <ChannelTableQuery id={channel.id.toString()} />
              </>
            )
          }}
        </Query>
      </Constrain>
    </TopBarLayout>
  )
}

export default ChannelTablePage
