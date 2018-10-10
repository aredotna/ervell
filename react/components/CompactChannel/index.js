import React, { Component } from 'react';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import { channelVisibilityForegroundColor } from 'react/styles/mixins';

import compactChannelFragment from 'react/components/CompactChannel/fragments/compactChannel';

import { mixin as boxMixin } from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import Count from 'react/components/UI/Count';

const Container = styled.a.attrs({
  px: 6,
  py: 5,
  border: '2px solid',
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${boxMixin}
  ${channelVisibilityForegroundColor}
  text-decoration: none;
`;

const Label = styled(Text)`
  display: inline-block;
  vertical-align: baseline;
  line-height: 1.33;
`;

export default class CompactChannel extends Component {
  static propTypes = {
    channel: propType(compactChannelFragment).isRequired,
  }

  render() {
    const { channel } = this.props;

    return (
      <Container href={channel.href} visibility={channel.visibility}>
        <div>
          <Label f={5}>
            {channel.title}
          </Label>

          <Label f={1} ml={6}>
            <Count label="block" amount={channel.counts.contents} />
          </Label>
        </div>

        <Label f={1}>
          by {channel.owner.name}
        </Label>
      </Container>
    );
  }
}
