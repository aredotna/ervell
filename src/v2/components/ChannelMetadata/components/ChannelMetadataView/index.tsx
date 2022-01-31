import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'

import CookieLinkUnlessCurrent from 'v2/components/UI/CookieLinkUnlessCurrent'
import Icon from 'v2/components/UI/Icons'
import Overlay from 'v2/components/UI/Overlay'
import Text from 'v2/components/UI/Text'
import { useHover } from 'v2/hooks/useHover'

import useSerializedMe from 'v2/hooks/useSerializedMe'

import { ChannelMetadata as Channel } from '__generated__/ChannelMetadata'

const BetaMessage = styled(Box).attrs({
  border: '1px solid',
  borderColor: 'state.premium',
  bg: 'background',
  p: 4,
})`
  border-radius: ${props => props.theme.radii.regular};
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.25);
  overflow: hidden;
  max-width: 20em;
`

const LinkContainer = styled(Box)`
  display: flex;
  align-items: center;

  ${props =>
    props.isActive &&
    `
    svg path {
      fill: ${x => x.theme.colors.gray.block};
    }
  `}
`

type ChannelViewType = 'table' | 'grid'

interface ChannelMetadataConnectionsProps {
  channel: Channel
  view?: ChannelViewType
}

export const ChannelMetadataView: React.FC<ChannelMetadataConnectionsProps> = ({
  channel,
  view,
}) => {
  const isViewActive = (v: ChannelViewType) => () => view === v
  v => () => view === v

  const me = useSerializedMe()

  return (
    <div>
      <CookieLinkUnlessCurrent
        name="view"
        value="grid"
        prefix={`Channel.${channel.slug}`}
        to={`${channel.href}/grid`}
        isActive={isViewActive('grid')}
      >
        Grid
      </CookieLinkUnlessCurrent>

      {me.is_premium && (
        <LinkContainer>
          <CookieLinkUnlessCurrent
            name="view"
            value="table"
            prefix={`Channel.${channel.slug}`}
            to={`${channel.href}/table`}
            isActive={isViewActive('table')}
          >
            Table
          </CookieLinkUnlessCurrent>
          <QuestionMarkOverlay />
        </LinkContainer>
      )}

      {!me.is_premium && (
        <LinkContainer>
          <Link to="/pricing">
            <Text color={'state.premium'} f={2}>
              Table
            </Text>
          </Link>
          <QuestionMarkOverlay />
        </LinkContainer>
      )}
    </div>
  )
}

const QuestionMarkOverlay: React.FC = () => {
  const [hoverRef, isHovered] = useHover()
  const targetEl = useRef(null)

  return (
    <>
      <LinkContainer ref={hoverRef} isActive={isHovered}>
        <Icon name="QuestionCircle" size="0.75rem" ml={3} />
        <span ref={targetEl} />
      </LinkContainer>

      {isHovered && (
        <Overlay
          alignToY="bottom"
          alignToX="right"
          anchorY="top"
          anchorX="left"
          offsetY={5}
          offsetX={0}
          disableTarget
          targetEl={() => targetEl.current}
        >
          <BetaMessage>
            <Text f={1} m={4}>
              <strong>Table view (beta)</strong>
            </Text>
            <Text f={1} m={4}>
              A spreadsheet-like view for channels. Still to come: configurable
              columns, advanced filters, bulk-edit, and search / profile table
              view.
            </Text>
          </BetaMessage>
        </Overlay>
      )}
    </>
  )
}
