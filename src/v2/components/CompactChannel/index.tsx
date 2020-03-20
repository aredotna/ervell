import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import constants from 'v2/styles/constants'

import {
  channelVisibilityForegroundColor,
  overflowEllipsis,
} from 'v2/styles/mixins'

import { mixin as boxMixin } from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Count from 'v2/components/UI/Count'
import GroupBadge from 'v2/components/UI/GroupBadge'
import BorderedLock from 'v2/components/UI/BorderedLock'
import { GenericButtonLink } from 'v2/components/UI/GenericButton'

import ManageChannel from 'v2/components/ManageChannel'
import Modal from 'v2/components/UI/Modal'

import { CompactChannel as Channel } from '__generated__/CompactChannel'
import { PureQueryOptions } from 'apollo-client'

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

const Button = styled(GenericButtonLink).attrs({ py: 3, px: 4, f: 0 })``

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

interface CompactChannelProps {
  channel: Channel
  showEditButton?: boolean
  refetchQueries?: PureQueryOptions[]
}

const openEditChannel = (
  id: string | number,
  refetchQueries: PureQueryOptions[]
) => {
  const modal = new Modal(ManageChannel, {
    id,
    refetchQueries,
    onDelete: () => {},
  })
  modal.open()
}

export const CompactChannel: React.FC<CompactChannelProps> = ({
  channel,
  showEditButton = false,
  refetchQueries,
  ...rest
}) => {
  const [mode, setMode] = useState<'resting' | 'hovered'>('resting')

  const handleMouseOver = useCallback(() => {
    showEditButton && setMode('hovered')
  }, [showEditButton, setMode])

  const handleMouseOut = useCallback(() => {
    showEditButton && setMode('resting')
  }, [showEditButton, setMode])

  const onEditClick = e => {
    e.preventDefault()
    e.stopPropagation()
    openEditChannel(channel.id, refetchQueries)
  }

  return (
    <Container
      href={channel.href}
      visibility={channel.visibility}
      {...rest}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
    >
      <Primary>
        <Label f={4} dangerouslySetInnerHTML={{ __html: channel.title }} />

        {channel.visibility === 'private' && <BorderedLock mr={3} />}

        <Label f={1} ml={6} secondary>
          <Count label="block" amount={channel.counts.contents} />
        </Label>
      </Primary>

      {mode === 'resting' && (
        <Label f={1} textAlign="right">
          by {channel.owner.name}
          {channel.owner.__typename === 'Group' && (
            <GroupBadge
              visibility={channel.owner.visibility}
              color={`channel.${channel.visibility}`}
            />
          )}
        </Label>
      )}

      {mode === 'hovered' && (
        <Label f={1} textAlign="right">
          <Button color={`channel.${channel.visibility}`} onClick={onEditClick}>
            Edit
          </Button>
        </Label>
      )}
    </Container>
  )
}

export const MemoizedCompactChannel = React.memo(CompactChannel)
