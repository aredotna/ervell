import React, { useState } from 'react'
import styled from 'styled-components'

import ColoredChannelSpan from 'v2/components/UI/ColoredChannelSpan/index.js'
import TickerTapeHover from 'v2/components/UI/TickerTapeHover/index.js'

import { inputPadding } from 'v2/components/UI/Inputs/index.js'
import { baseMixin as baseTextMixin } from 'v2/components/UI/Text/index.js'
import Badge from 'v2/components/UI/Badge/index.js'
import Box from 'v2/components/UI/Box/index.js'
import BorderedLock from 'v2/components/UI/BorderedLock/index.js'

import { SelectableChannel as Channel } from '__generated__/SelectableChannel'

const Lock = styled(Box).attrs({
  pr: 3,
  pl: 6,
})`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: linear-gradient(
    to left,
    ${props => props.theme.colors.gray.hint} 90%,
    ${props => props.theme.colors.utility.transparent}
  );
  z-index: 1;
`

const Container = styled.div.attrs({
  role: 'button',
  tabIndex: 0,
  f: 1,
})`
  ${baseTextMixin}
  position: relative;
  margin-top: -1px;
  line-height: 1;
  user-select: none;
  cursor: pointer;
  color: ${props => props.theme.colors.gray.semiBold};
  border: 1px solid ${props => props.theme.colors.gray.regular};
  background-color: ${props => props.theme.colors.gray.hint};
  white-space: nowrap;
  overflow: hidden;
  text-align: left;

  &:hover {
    z-index: 1;
    border: 1px solid ${props => props.theme.colors.gray.semiBold};

    ${Lock} {
      display: none;
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1em;
    background: linear-gradient(to left, ${props =>
      props.theme.colors.gray.hint}, ${props =>
  props.theme.colors.utility.transparent});
    z-index: 1;
  }

  &:hover,
  &[data-selected="true"] {
    &:before {
      width: 3em;
      background linear-gradient(to left, ${props =>
        props.theme.colors.gray.hint} 60%, ${props =>
  props.theme.colors.utility.transparent})
    }

    &:after {
      content: '✔';
      position: absolute;
      top: 50%;
      right: 0;
      width: 2em;
      text-align: center;
      transform: translateY(-50%);
      z-index: 1;
    }
  }

  &[data-selected="true"] {
    > div {
      opacity: 0.5;
    }
  }
`

const HoverableInner = styled(TickerTapeHover).attrs({
  speed: 1,
  offsetBuffer: 32,
})`
  padding: ${inputPadding}; // TODO
`

const Separator = styled.div`
  display: inline-block;
  width: 1px;
  height: 0.75em;
  margin: 0 ${props => props.theme.constantValues.doubleEmptySpaceWidth};
  vertical-align: baseline;
  transform: rotate(30deg);
  background-color: ${props => props.theme.colors.gray.medium};
`

const GroupBadge = styled(Badge)`
  transform: scale(0.8);
`

interface SelectableChannelProps {
  onSelection?: (isSelected: boolean, channel: Channel) => void
  channel: Channel
}

export const SelectableChannel: React.FC<SelectableChannelProps> = ({
  channel,
  onSelection,
}) => {
  const [selected, setSelected] = useState(false)

  const toggleSelection = () => {
    setSelected(!selected)
    onSelection(!selected, channel)
  }

  const {
    owner,
    owner: { name },
    title,
    visibility,
  } = channel

  return (
    <Container
      onClick={toggleSelection}
      data-selected={selected}
      onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}
    >
      <HoverableInner>
        {name}

        {owner.__typename === 'Group' && (
          <GroupBadge
            ml={2}
            f={0}
            color="gray.medium"
            icon={{ private: 'Lock' }[owner.visibility]}
          >
            Group
          </GroupBadge>
        )}

        <Separator />

        <ColoredChannelSpan
          visibility={visibility}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </HoverableInner>

      {visibility === 'private' && (
        <Lock>
          <BorderedLock />
        </Lock>
      )}
    </Container>
  )
}
