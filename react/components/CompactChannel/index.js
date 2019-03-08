import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import constants from 'react/styles/constants';

import { channelVisibilityForegroundColor, overflowEllipsis } from 'react/styles/mixins';

import compactChannelFragment from 'react/components/CompactChannel/fragments/compactChannel';

import { mixin as boxMixin } from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import Count from 'react/components/UI/Count';
import GroupBadge from 'react/components/UI/GroupBadge';

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

export const EmptyCompactChannel = ({ children, ...props }) => (
  <Container {...props}>
    {typeof children === 'string' ? (
      <Primary>
        <Label f={4}>
          {children}
        </Label>
      </Primary>
    ) : children}
  </Container>
);

EmptyCompactChannel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

export default class CompactChannel extends PureComponent {
  static propTypes = {
    channel: propType(compactChannelFragment).isRequired,
  }

  render() {
    const { channel, ...rest } = this.props;

    return (
      <Container href={channel.href} visibility={channel.visibility} {...rest}>
        <Primary>
          <Label
            f={4}
            dangerouslySetInnerHTML={{ __html: channel.title }}
          />

          <Label f={1} ml={6} secondary>
            <Count label="block" amount={channel.counts.contents} />
          </Label>
        </Primary>

        <Label f={1} textAlign="right">
          by {channel.owner.name}

          {channel.owner.__typename === 'Group' &&
            <GroupBadge visibility={channel.owner.visibility} />
          }
        </Label>
      </Container>
    );
  }
}
