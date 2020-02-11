import React, { useState } from 'react'
import styled from 'styled-components'
import { debounce, isEmpty } from 'underscore'

import { __outlineBorder__ } from 'v2/styles/mixins'

import { Input } from 'v2/components/UI/Inputs'
import Text from 'v2/components/UI/Text'
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

  return (
    <Container mode={mode} isOutlined={isOutlined}>
      <SearchInput onChange={handleChange} />

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
