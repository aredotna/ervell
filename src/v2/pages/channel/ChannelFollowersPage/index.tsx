import React from 'react'
import { Query } from '@apollo/client/react/components'

import { ChannelFollowersPage as ChannelFollowersPageData } from '__generated__/ChannelFollowersPage'
import { channelFollowersPageQuery } from './queries/channelFollowersPage'

import Constrain from 'v2/components/UI/Constrain'
import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import ChannelMetadata from 'v2/components/ChannelMetadata'
import { ChannelFollowers } from 'v2/components/ChannelFollowers'
import { ChannelPageMetaTags } from 'v2/pages/channel/components/ChannelPageMetaTags'

interface Props {
  id: string
}

export default ({ id }: Props) => {
  return (
    <TopBarLayout>
      <Constrain>
        <Query<ChannelFollowersPageData>
          query={channelFollowersPageQuery}
          variables={{ id }}
        >
          {({ data, loading, error }) => {
            if (loading) {
              return <LoadingIndicator />
            }

            if (error) {
              return (
                <ErrorAlert mt={9} isReloadable>
                  {error.message}
                </ErrorAlert>
              )
            }

            const { channel } = data

            return (
              <>
                <ChannelPageMetaTags channel={channel} subtitle="Followers" />

                <ChannelMetadata channel={channel} />

                <ChannelFollowers id={channel.id} />
              </>
            )
          }}
        </Query>
      </Constrain>
    </TopBarLayout>
  )
}
