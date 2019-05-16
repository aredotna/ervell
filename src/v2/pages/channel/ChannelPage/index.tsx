import React from 'react'
import { Query } from 'react-apollo'

import { ChannelPage as ChannelPageData } from '__generated__/ChannelPage'

import channelPageQuery from 'v2/pages/channel/ChannelPage/queries/channelPage'

import Constrain from 'v2/components/UI/Constrain'
import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import ChannelMetadata from 'v2/components/ChannelMetadata'
import ChannelContents from 'v2/components/ChannelContents'
import { ChannelContentsFilter } from 'v2/components/ChannelContentsFilter'
import { ChannelPageMetaTags } from 'v2/pages/channel/components/ChannelPageMetaTags'

interface Variables {
  id: string
}

export default ({ id }) => {
  return (
    <TopBarLayout>
      <Constrain>
        <Query<ChannelPageData, Variables>
          query={channelPageQuery}
          variables={{ id }}
        >
          {({ data, loading, error }) => {
            if (loading) {
              return <LoadingIndicator />
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

                <ChannelContents channel={channel} />
              </>
            )
          }}
        </Query>
      </Constrain>
    </TopBarLayout>
  )
}
