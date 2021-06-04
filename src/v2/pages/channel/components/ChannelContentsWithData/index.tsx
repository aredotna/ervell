import React from 'react'
import { Query } from '@apollo/client/react/components'
import sharify from 'sharify'

import { ChannelContentsWithData as ChannelContentsWithDataData } from '__generated__/ChannelContentsWithData'

import { setupPusherChannel } from 'v2/hooks/usePusher'
import { channelContentsWithDataQuery } from 'v2/pages/channel/components/ChannelContentsWithData/queries/channelContentsWithData'

import WithIsSpiderRequesting from 'v2/hocs/WithIsSpiderRequesting'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import ChannelContents from 'v2/components/ChannelContents'
import { ChannelContentsPlaceholder } from 'v2/components/ChannelContentsPlaceholder'

interface Props {
  channel: {
    id: number | string
  }
}

interface ExtendedProps extends Props {
  isSpiderRequesting: boolean
}

const {
  data: { NODE_ENV },
} = sharify

export const ChannelContentsWithData: React.FC<Props> = WithIsSpiderRequesting<
  ExtendedProps
>(({ channel: serverChannel, isSpiderRequesting }) => {
  return (
    <Query<ChannelContentsWithDataData>
      query={channelContentsWithDataQuery}
      variables={{ id: serverChannel.id }}
      ssr={isSpiderRequesting}
      fetchPolicy="no-cache"
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <ChannelContentsPlaceholder />
        }

        if (error) {
          return <ErrorAlert>{error.message}</ErrorAlert>
        }

        const { channel: clientChannel } = data
        const channel = { ...serverChannel, ...clientChannel }

        const shouldSubscribeToPusher =
          !isSpiderRequesting && channel.can.add_to

        if (shouldSubscribeToPusher) {
          const { channel: pusherChannel, socket } = setupPusherChannel(
            `channel-${NODE_ENV}-${channel.id}`
          )

          return (
            <ChannelContents
              channel={channel}
              socket={socket}
              pusherChannel={pusherChannel}
            />
          )
        }

        return <ChannelContents channel={channel} />
      }}
    </Query>
  )
})
