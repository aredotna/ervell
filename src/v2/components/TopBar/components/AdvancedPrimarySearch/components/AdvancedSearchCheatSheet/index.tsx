import React, { useCallback } from 'react'
import styled from 'styled-components'

import Icon from 'v2/components/UI/Icons'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Modal from 'v2/components/UI/Modal'

import { useHover } from 'v2/hooks/useHover'
import { Copy } from 'v2/components/UI/QuestionMarkOverlay'
import { Key } from 'v2/components/UI/Key'

const IconContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled(Text).attrs({
  f: 2,
  fontWeight: 'bold',
  mb: 4,
})`
  text-align: center;
`

export const Label = styled(Text).attrs({
  f: 1,
  ml: 2,
  fontWeight: 'bold',
})`
  margin-bottom: 1px;
`

const LinkContainer = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  pointer-events: all;
  max-width: fit-content;

  ${props =>
    props.isActive &&
    `
    svg path {
      fill: ${x => x.theme.colors.gray.block};
    }
  `}

  &:hover ${Label} {
    color: ${x => x.theme.colors.gray.bold};
  }
`

const CheatSheetCopy = styled(Copy).attrs({
  color: 'gray.base',
})`
  ul {
    margin-bottom: ${props => props.theme.space[7]};
  }
  li {
    font-size: ${p => p.theme.fontSizes[1]};
    margin-bottom: ${p => p.theme.space[2]};
  }
`

interface CheatSheetProps {
  iconColor?: string
  iconHoverColor?: string
  labelColor?: string
}

const CheatSheetModal: React.FC = () => {
  return (
    <Box py={6} px={4}>
      <Title>Advanced search cheat sheet</Title>
      <CheatSheetCopy>
        <strong>Keyboard</strong>
        <ul>
          <li>
            Use <Key>TAB</Key> or <Key>/</Key> to focus search field
          </li>
          <li>
            Use the arrow keys <Key>↑</Key> <Key>↓</Key> to select results
          </li>
          <li>
            Hit <Key>ENTER</Key> to navigate to the selected result
          </li>
          <li>
            If no results are selected, hit <Key>ENTER</Key> to view all results
          </li>
        </ul>
        <strong>Scoped searches</strong>
        <ul>
          <li>
            Type <strong>user:person-name</strong> to search content from a
            specific person
          </li>
          <li>
            Type <strong>group:group-name</strong> to search content from a
            specific group
          </li>
          <li>
            Type <strong>channel:channel-name</strong> to search content from a
            specific channel
          </li>
          <li>
            You can also press the scoped search button when on a profile, group
            or channel
          </li>
        </ul>
        <strong>Combined scopes</strong>
        <ul>
          <li>
            Type <strong>user:person-name group:group-name</strong> to search
            content from a specific person and group
          </li>
          <li>
            Type <strong>user:person-name channel:channel-name</strong> to
            search content from a specific person and channel
          </li>
          <li>
            Type <strong>channel:channel-name1 channel:channel-name2</strong> to
            search content from a combination between multiple channels
          </li>
        </ul>
        <strong>Date ranges</strong>
        <ul>
          <li>
            Use <strong>before:YYYY-DD-MM</strong> and{' '}
            <strong>after:YYYY-DD-MM</strong> to find results in a specific
            range
          </li>
          <li>
            Date range search uses <strong>updated at</strong> by default. Set
            the order to <strong>newest first</strong> to get results created
            within a specific time range
          </li>
        </ul>
      </CheatSheetCopy>
    </Box>
  )
}

export const AdvancedSearchCheatSheetButton: React.FC<CheatSheetProps> = ({
  iconColor = 'gray.medium',
  iconHoverColor = 'gray.bold',
  labelColor = 'gray.medium',
}) => {
  const [hoverRef, isHovered] = useHover()

  const openModal = useCallback(() => {
    const modal = new Modal(CheatSheetModal, {}, { height: 'auto' })
    modal.open()
  }, [])

  return (
    <LinkContainer ref={hoverRef} onClick={openModal}>
      <IconContainer>
        <Icon
          name="QuestionCircle"
          size="0.75rem"
          ml={3}
          color={isHovered ? iconHoverColor : iconColor}
        />
        <Label color={labelColor}>Cheat sheet</Label>
      </IconContainer>
    </LinkContainer>
  )
}
