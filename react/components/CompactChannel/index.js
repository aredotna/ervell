import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import constants from 'react/styles/constants';

import { channelVisibilityForegroundColor, overflowEllipsis } from 'react/styles/mixins';

import compactChannelFragment from 'react/components/CompactChannel/fragments/compactChannel';

import { mixin as boxMixin } from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import Count from 'react/components/UI/Count';

const Container = styled.a.attrs({
  px: 6,
  py: 6,
  border: '2px solid',
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${boxMixin}
  ${channelVisibilityForegroundColor}
  text-decoration: none;
  break-inside: avoid;
`;

const Primary = styled.div`
  ${overflowEllipsis}
`;

const Label = styled(Text).attrs({
  mx: 3,
})`
  display: inline-block;
  vertical-align: baseline;
  line-height: 1.33;
  white-space: nowrap;

  ${constants.media.small`
    ${x => x.secondary && `
      display: none;
    `}
  `}
`;

export default class CompactChannel extends PureComponent {
  static propTypes = {
    channel: propType(compactChannelFragment).isRequired,
  }

  render() {
    const { channel, ...rest } = this.props;

    return (
      <Container href={channel.href} visibility={channel.visibility} {...rest}>
        <Primary>
          <Label f={4}>
            {channel.title}
          </Label>

          <Label f={1} ml={6} secondary>
            <Count label="block" amount={channel.counts.contents} />
          </Label>
        </Primary>

        <Label f={1} textAlign="right">
          by {channel.owner.name}
        </Label>
      </Container>
    );
  }
}
