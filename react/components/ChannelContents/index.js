import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';

import channelContentsFragment from 'react/components/ChannelContents/fragments/channelContents';

import Grid from 'react/components/UI/Grid';
import Text from 'react/components/UI/Text';
import Cell from 'react/components/Cell';

export default class ChannelContents extends PureComponent {
  static propTypes = {
    channel: propType(channelContentsFragment).isRequired,
  }

  render() {
    const { channel, ...rest } = this.props;

    return (
      <Grid {...rest}>
        {channel.skeleton.map(({ id, type }) => (
          <Cell.Skeletal border="1px solid" borderColor="gray.light" key={`${type}:${id}`} p={6}>
            <Text f={5} color="gray.medium">{type}:{id}</Text>
          </Cell.Skeletal>
        ))}
      </Grid>
    );
  }
}
