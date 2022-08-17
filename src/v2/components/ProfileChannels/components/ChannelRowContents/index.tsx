import React from 'react'
import { useQuery } from '@apollo/client'

import { ChannelRow } from 'v2/components/ProfileChannels/components/ChannelRow'
import Grid from 'v2/components/UI/Grid'
import Cell from 'v2/components/Cell'

import {
  ChannelRowContents as ChannelRowContentsType,
  ChannelRowContentsVariables,
} from '__generated__/ChannelRowContents'
import channelRowContentsQuery from './queries/channelRowContentsQuery'
import {
  ProfileChannelsSearch_identity_identifiable_Group_channels,
  ProfileChannelsSearch_identity_identifiable_User_channels_Channel,
} from '__generated__/ProfileChannelsSearch'

interface ChannelRowContentsProps {
  channel:
    | ProfileChannelsSearch_identity_identifiable_Group_channels
    | ProfileChannelsSearch_identity_identifiable_User_channels_Channel
}

export const ChannelRowContents: React.FC<ChannelRowContentsProps> = ({
  channel,
}) => {
  const { data, loading } = useQuery<
    ChannelRowContentsType,
    ChannelRowContentsVariables
  >(channelRowContentsQuery, {
    variables: {
      id: channel.id.toString(),
    },
  })

  if (loading) {
    return (
      <ChannelRow channel={channel}>
        <Grid>
          <Cell.Konnectable konnectable={channel} isPreviewable={false} />
          <Cell.Skeletal />
          <Cell.Skeletal />
          <Cell.Skeletal />
          <Cell.Skeletal />
        </Grid>
      </ChannelRow>
    )
  }

  return (
    <ChannelRow channel={channel}>
      <Grid>
        <Cell.Konnectable konnectable={channel} isPreviewable={false} />
        {data.channel.blokks.map((blokk, i) =>
          blokk ? (
            <Cell.Konnectable
              key={`${blokk.__typename}_${blokk.id}`}
              konnectable={blokk}
              context={data.channel.blokks}
            />
          ) : (
            <Cell.Skeletal key={i} />
          )
        )}
      </Grid>
    </ChannelRow>
  )
}

export default ChannelRowContents
