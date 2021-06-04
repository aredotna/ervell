import uuidv4 from 'uuid/v4'
import React from 'react'
import { storiesOf } from '@storybook/react'

import { Query } from '@apollo/client/react/components'
import { gql } from '@apollo/client'

import Specimen from 'v2/stories/__components__/Specimen'

import Grid from 'v2/components/UI/Grid'
import Cell from 'v2/components/Cell'
import ChannelRow from 'v2/components/ProfileChannels/components/ChannelRow'

import konnectableChannelFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableChannel/fragments/konnectableChannel'
import konnectableCellFragment from 'v2/components/Cell/components/Konnectable/fragments/konnectableCell'

const CHANNEL_QUERY = gql`
  query ChannelRowStoryQuery {
    channel(id: 666) {
      ...KonnectableChannel
      blokks(per: 5, sort_by: POSITION, direction: DESC) {
        ...KonnectableCell
      }
    }
  }
  ${konnectableCellFragment}
  ${konnectableChannelFragment}
`
storiesOf('ChannelRow', module).add('default', () => (
  <Specimen>
    <Query key={uuidv4()} query={CHANNEL_QUERY} fetchPolicy="no-cache">
      {response => {
        console.log('RESPONSE ', response)

        const { data, loading, error } = response
        if (loading || error || !data) return 'LOADING'

        const { channel } = data

        return (
          <ChannelRow key={channel.id} channel={channel}>
            <Grid>
              <Cell.Konnectable konnectable={channel} />

              {channel.blokks.map(blokk => (
                <Cell.Konnectable
                  key={`${blokk.__typename}_${blokk.id}`}
                  konnectable={blokk}
                  context={channel.blokks}
                />
              ))}
            </Grid>
          </ChannelRow>
        )
      }}
    </Query>
  </Specimen>
))
