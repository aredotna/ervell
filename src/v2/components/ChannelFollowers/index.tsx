import React from 'react'

import { channelFollowersQuery } from './queries/channelFollowers'
import { ChannelFollowers as ChannelFollowersData } from '__generated__/ChannelFollowers'
import { Follows } from 'v2/components/Follows'

export const ChannelFollowers = ({ id }) => {
  return (
    <Follows<ChannelFollowersData>
      query={channelFollowersQuery}
      variables={{ id }}
      dataSelector={({ channel: { followers } }) => followers}
      updateQuery={(
        prevResult: ChannelFollowersData,
        { fetchMoreResult }: { fetchMoreResult: ChannelFollowersData }
      ) => {
        return {
          ...prevResult,
          channel: {
            ...prevResult.channel,
            followers: [
              ...prevResult.channel.followers,
              ...fetchMoreResult.channel.followers,
            ],
          },
        }
      }}
      fetchPolicy="network-only"
    />
  )
}
