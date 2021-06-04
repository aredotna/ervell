import React, { useEffect } from 'react'
import { Query } from '@apollo/client/react/components'
import styled from 'styled-components'

import { ChannelPage as ChannelPageData } from '__generated__/ChannelPage'

import channelPageQuery from 'v2/pages/channel/ChannelPage/queries/channelPage'

import Constrain from 'v2/components/UI/Constrain'
import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import ChannelMetadata from 'v2/components/ChannelMetadata'

import { ChannelContentsFilter } from 'v2/components/ChannelContentsFilter'
import { ChannelEmptyMessage } from 'v2/components/ChannelEmptyMessage'
import { ChannelPageMetaTags } from 'v2/pages/channel/components/ChannelPageMetaTags'
import { ChannelContentsWithData } from 'v2/pages/channel/components/ChannelContentsWithData'

import { MobileOrChildren } from 'v2/components/MobileBanner'
import BottomBanner from 'v2/components/BottomBanner'
import { LoadingPage } from 'v2/components/LoadingPage'

import Modal from 'v2/components/UI/Modal'
import ModalDialog from 'v2/components/UI/ModalDialog'
import IntroduceChannel from 'v2/components/Onboarding/components/Channels/components/IntroduceChannel'

const Dialog = styled(ModalDialog).attrs({
  width: 'auto',
  height: 'auto',
  maxHeight: '100%',
  maxWidth: '100%',
})``

interface ChannelPageProps {
  id: string
  fromOnboarding?: boolean
}

interface Variables {
  id: string
}

const ChannelPage: React.FC<ChannelPageProps> = ({ id, fromOnboarding }) => {
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

                <ChannelContentsFilter channel={channel} />

                {channel.counts.contents === 0 &&
                !channel.can.add_to &&
                !channel.can.add_to_as_premium ? (
                  <ChannelEmptyMessage my={8} channelOwner={channel.owner} />
                ) : (
                  <ChannelContentsWithData channel={channel} />
                )}

                <MobileOrChildren route="channel" id={channel.id}>
                  <BottomBanner
                    banner="LOGGED_OUT_CHANNEL"
                    name={channel.title}
                  />
                </MobileOrChildren>
              </>
            )
          }}
        </Query>
      </Constrain>
    </TopBarLayout>
  )
}

export default ChannelPage
