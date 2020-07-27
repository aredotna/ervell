import React, { useState, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { debounce, isEmpty } from 'underscore'

import { __outlineBorder__ } from 'v2/styles/mixins'

import { Input } from 'v2/components/UI/Inputs'
import Text from 'v2/components/UI/Text'
import Icons from 'v2/components/UI/Icons'
import { getSpace } from 'v2/styles/functions'
import Overlay from 'v2/components/UI/Overlay'

import { RecentChannels } from 'v2/components/ConnectionSelectionList/components/RecentChannels'
import SearchedChannels from 'v2/components/ConnectionSelectionList/components/SearchedChannels'

import { SelectableChannel as Channel } from '__generated__/SelectableChannel'

const Container = styled.div`
  position: relative;

  ${x =>
    x.mode === 'active' &&
    x.isOutlined &&
    `
    &:after {
      ${__outlineBorder__()}
    }
  `}
`

const SearchContainer = styled.div`
  position: relative;
`

const SearchSettingsContainer = styled.div`
  position: absolute;
  right: ${getSpace(1)};
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
`

const SearchSettings = styled(Icons).attrs({
  name: 'Cog',
  size: '1rem',
  color: 'gray.medium',
  mr: 4,
})`
  cursor: pointer;
  &:hover {
    svg {
      fill: ${props => props.theme.colors.gray.bold};
    }
  }
`

const SearchInput = styled(Input).attrs({
  f: 1,
  placeholder: 'Type channel name',
  autoFocus: true,
})`
  &,
  &:focus {
    border: 1px solid ${x => x.theme.colors.gray.regular} !important;
  }
`

const OutlinedRecentChannels = styled(RecentChannels)`
  position: relative;

  ${x =>
    x.isOutlined &&
    `
    &:after {
      ${__outlineBorder__()}
    }
  `}
`

export type OnConnectionSelectionType = (
  isSelected: boolean,
  channel: Channel
) => void

export interface ConnectionSelectionListProps {
  isOutlined?: boolean
  onConnectionSelection?: OnConnectionSelectionType
  selectedChannels?: Channel[]
}

export const ConnectionSelectionList: React.FC<ConnectionSelectionListProps> = ({
  isOutlined = true,
  onConnectionSelection = () => {},
  selectedChannels = [],
}) => {
  const [debouncedQuery, setDebouncedQuery] = useState<string>('')
  const [mode, setMode] = useState<'active' | 'resting'>('resting')

  const debounceQuery = debounce(debouncedQuery => {
    setDebouncedQuery(debouncedQuery)
  }, 200)

  const handleChange = ({ target: { value: query } }) => {
    const mode = isEmpty(query) ? 'resting' : 'active'
    setMode(mode)
    debounceQuery(query)
  }

  const [settingsMode, setSettingsMode] = useState<'resting' | 'open'>(
    'resting'
  )

  const openMenu = useCallback(e => {
    e.preventDefault()
    e.stopPropagation()
    setSettingsMode('open')
  }, [])

  const closeMenu = useCallback(e => {
    e.preventDefault()
    e.stopPropagation()
    setSettingsMode('resting')
  }, [])

  const targetEl = useRef(null)

  console.log('ref', targetEl)

  return (
    <Container mode={mode} isOutlined={isOutlined}>
      <SearchContainer>
        <SearchInput onChange={handleChange} />
        <SearchSettingsContainer ref={targetEl}>
          <SearchSettings
            onClick={{ open: closeMenu, resting: openMenu }[settingsMode]}
          />
        </SearchSettingsContainer>
        {settingsMode === 'open' && (
          <Overlay
            onClose={closeMenu}
            targetEl={() => targetEl.current}
            alignToY="bottom"
            alignToX="right"
            anchorY="top"
            anchorX="right"
            offsetY={5}
            offsetX={0}
            disableTarget
          >
            <h1>Hello</h1>
          </Overlay>
        )}
      </SearchContainer>

      {mode === 'resting' && (
        <>
          <Text f={1} py={4} px={5} textAlign="center" color="gray.medium">
            Recent channels
          </Text>
          <OutlinedRecentChannels
            isOutlined={isOutlined}
            onConnectionSelection={onConnectionSelection}
            selectedChannels={selectedChannels}
          />
        </>
      )}
      {mode === 'active' && (
        <>
          <SearchedChannels
            query={debouncedQuery}
            onConnectionSelection={onConnectionSelection}
          />
        </>
      )}
    </Container>
  )
}
