import uuidv4 from 'uuid/v4';
import React from 'react';
import { storiesOf } from '@storybook/react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Specimen from 'react/stories/__components__/Specimen';

import Grid from 'react/components/UI/Grid';
import Cell from 'react/components/Cell';
import ChannelRow from 'react/components/ProfileChannels/components/ChannelRow';

import blokkChannelFragment from 'react/components/Cell/components/Konnectable/components/Channel/fragments/channel';
import konnectableCellFragment from 'react/components/Cell/components/Konnectable/fragments/konnectableCell';

const CHANNEL_QUERY = gql`
  query {
    channel(id: 666) {
      ...Channel
      blokks(per: 5, sort_by: POSITION, direction: DESC) {
        ... KonnectableCell
      }
    }
  }
  ${konnectableCellFragment}
  ${blokkChannelFragment}
`;
storiesOf('ChannelRow', module)
  .add('default', () => (
    <Specimen>
      <Query key={uuidv4()} query={CHANNEL_QUERY}>
        {({ data, loading, error }) => {
          if (loading || error) return 'LOADING';

          const { channel } = data;

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
          );
        }}
      </Query>
    </Specimen>
  ));
