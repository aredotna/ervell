import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'graphql-anywhere'
import styled from 'styled-components'

import constants from 'v2/styles/constants'

import {
  channelVisibilityForegroundColor,
  overflowEllipsis,
} from 'v2/styles/mixins'

import compactChannelFragment from 'v2/components/CompactChannel/fragments/compactChannel'

import { mixin as boxMixin } from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Count from 'v2/components/UI/Count'
import GroupBadge from 'v2/components/UI/GroupBadge'
import BorderedLock from 'v2/components/UI/BorderedLock'

const Primary = styled.div`
  ${overflowEllipsis}
`

const Label = styled(Text).attrs({
  mx: 3,
})`
  display: inline-block;
  vertical-align: baseline;
  line-height: 1.33;
  white-space: nowrap;

  ${constants.media.small`
    ${x =>
      x.secondary &&
      `
      display: none;
    `}
  `}
`

const Container = styled.a.attrs({
  px: 6,
  py: 6,
  border: '2px solid',
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  break-inside: avoid;
  overflow: hidden;
  cursor: pointer;
  ${boxMixin}
  ${channelVisibilityForegroundColor}

  ${Label} {
    ${channelVisibilityForegroundColor}
  }
`

export const EmptyCompactChannel = ({ children, ...props }) => (
  <Container {...props}>
    {typeof children === 'string' ? (
      <Primary>
        <Label f={4}>{children}</Label>
      </Primary>
    ) : (
      children
    )}
  </Container>
)

EmptyCompactChannel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
}

export default class CompactChannel extends PureComponent {
  static propTypes = {
    channel: propType(compactChannelFragment).isRequired,
  }

  render() {
    const { channel, ...rest } = this.props

    return (
      <Container href={channel.href} visibility={channel.visibility} {...rest}>
        <Primary>
          <Label f={4} dangerouslySetInnerHTML={{ __html: channel.title }} />

          {channel.visibility === 'private' && <BorderedLock mr={3} />}

          <Label f={1} ml={6} secondary>
            <Count label="block" amount={channel.counts.contents} />
          </Label>
        </Primary>

        <Label f={1} textAlign="right">
          by {channel.owner.name}
          {channel.owner.__typename === 'Group' && (
            <GroupBadge
              visibility={channel.owner.visibility}
              color={`channel.${channel.visibility}`}
            />
          )}
        </Label>
      </Container>
    )
  }
}
