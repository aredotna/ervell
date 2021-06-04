import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { PureQueryOptions, ApolloClient, useApolloClient } from '@apollo/client'
import { Link } from 'react-router-dom'
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
import compactChannel from './fragments/compactChannel'
import { getBreadcrumbPath } from 'v2/util/getBreadcrumbPath'

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

interface CompactChannelProps {
  channel: Channel
  showEditButton?: boolean
  refetchQueries?: PureQueryOptions[]
}

const openEditChannel = (
  id: string | number,
  refetchQueries: PureQueryOptions[],
  client: ApolloClient<object>
) => {
  const modal = new Modal(ManageChannel, {
    id,
    refetchQueries,
    onDelete: () => {
      client.writeFragment({
        id: `Channel:${id}`,
        fragment: compactChannel,
        data: null,
      })
      modal.close()
    },
    onUpdate: () => {
      modal.close()
    },
  })
  modal.open()
}

const CompactChannelComponent: React.FC<CompactChannelProps> = ({
  channel,
  showEditButton = false,
  refetchQueries,
  ...rest
}) => {
  const [mode, setMode] = useState<'resting' | 'hovered'>('resting')
  const client = useApolloClient()

  const handleMouseOver = useCallback(() => {
    showEditButton && setMode('hovered')
  }, [showEditButton, setMode])

  const handleMouseOut = useCallback(() => {
    showEditButton && setMode('resting')
  }, [showEditButton, setMode])

  const onEditClick = e => {
    e.preventDefault()
    e.stopPropagation()
    openEditChannel(channel.id, refetchQueries, client)
  }

  const toParams = {
    pathname: channel.href,
    state: getBreadcrumbPath(channel),
  }

  return (
    <Container
      as={Link}
      to={toParams}
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
              color={`channel.${channel.visibility.toLowerCase()}`}
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

export const CompactChannel = React.memo(CompactChannelComponent)
