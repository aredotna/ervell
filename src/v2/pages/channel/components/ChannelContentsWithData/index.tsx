import React from 'react'
import { Query } from '@apollo/client/react/components'

import {
  ChannelContentsWithData as ChannelContentsWithDataData,
  ChannelContentsWithDataVariables,
} from '__generated__/ChannelContentsWithData'

import { channelContentsWithDataQuery } from 'v2/pages/channel/components/ChannelContentsWithData/queries/channelContentsWithData'

import ErrorAlert from 'v2/components/UI/ErrorAlert'
import ChannelContents from 'v2/components/ChannelContents'
import { ChannelContentsPlaceholder } from 'v2/components/ChannelContentsPlaceholder'

interface Props {
  channel: {
    id: number | string
  }
}

export const ChannelContentsWithData: React.FC<Props> = ({
  channel: serverChannel,
}) => {
  return (
    <Query<ChannelContentsWithDataData, ChannelContentsWithDataVariables>
      query={channelContentsWithDataQuery}
      variables={{ id: serverChannel.id.toString() }}
      ssr={true}
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

        return <ChannelContents channel={channel} />
      }}
    </Query>
  )
}
