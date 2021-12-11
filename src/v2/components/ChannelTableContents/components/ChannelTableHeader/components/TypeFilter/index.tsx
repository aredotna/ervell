import React, { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { debounce, isEmpty } from 'underscore'

import { SearchInput } from '../FilterContainer'
import {
  ChannelTableTypes,
  ChannelTableTypesVariables,
} from '__generated__/ChannelTableTypes'
import channelTypesQuery from './queries/channelTypes'
import Box from 'v2/components/UI/Box'
import { ItemContainer } from '../FilterComponents'
import Text from 'v2/components/UI/Text'
import { ConnectableTypeEnum } from '__generated__/globalTypes'

const SearchContainer = styled.div`
  position: relative;
`

const ResultContainer = styled(Box).attrs({
  position: 'absolute',
  width: '100%',
  zIndex: 1,
})``

const Item = styled(ItemContainer)`
  text-transform: capitalize;
`

interface TypeListProps {
  id: string | number
  handleSelect: (value: string) => void
}

const TypeList: React.FC<TypeListProps> = ({ id, handleSelect }) => {
  const { data } = useQuery<ChannelTableTypes, ChannelTableTypesVariables>(
    channelTypesQuery,
    { variables: { id: id.toString() } }
  )

  return (
    <ResultContainer>
      {data?.channel?.types.map(type => {
        return (
          <Item onClick={() => handleSelect(type)}>
            <Text f={1}>{type.toLowerCase()}</Text>
          </Item>
        )
      })}
    </ResultContainer>
  )
}

interface TypeFilterProps {
  id: string | number
  setType: (value: ConnectableTypeEnum) => void
}

const TypeFilter: React.FC<TypeFilterProps> = ({ id, setType }) => {
  const [, setDebouncedQuery] = useState<string>('')
  const [mode, setMode] = useState<'active' | 'focused' | 'resting'>('resting')
  const [selectedType, setSelectedType] = useState<ConnectableTypeEnum | null>(
    null
  )

  const inputRef = useRef(null)
  const debounceQuery = debounce(debouncedQuery => {
    setDebouncedQuery(debouncedQuery)
  }, 200)

  const handleChange = ({ target: { value: query } }) => {
    const mode = isEmpty(query) ? 'resting' : 'active'
    setMode(mode)
    debounceQuery(query)
  }

  const handleFocus = useCallback(() => {
    setMode('focused')
  }, [setMode])

  const handleBlur = useCallback(() => {
    // setMode('resting')
  }, [setMode])

  const handleSelect = useCallback(type => {
    setSelectedType(type)
    setType(type)
    setMode('resting')
  }, [])

  return (
    <SearchContainer>
      <SearchInput
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={'Select content type'}
        value={selectedType}
      />
      {mode == 'focused' && <TypeList id={id} handleSelect={handleSelect} />}
    </SearchContainer>
  )
}

export default TypeFilter
