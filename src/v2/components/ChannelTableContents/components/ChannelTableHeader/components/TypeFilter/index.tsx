import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { debounce, isEmpty } from 'underscore'
import { capitalize } from 'lodash'

import { SearchInput } from 'v2/components/Table/components/FilterContainer'
import Box from 'v2/components/UI/Box'
import { ItemContainer } from 'v2/components/Table/components/FilterComponents'
import Text from 'v2/components/UI/Text'
import { inputPadding } from 'v2/components/UI/Inputs'

import {
  ChannelTableTypes,
  ChannelTableTypesVariables,
} from '__generated__/ChannelTableTypes'
import channelTypesQuery from './queries/channelTypes'
import { ConnectableTypeEnum } from '__generated__/globalTypes'
import { DownArrow } from 'v2/components/UI/SortArrows'

const SearchContainer = styled.div`
  position: relative;
`

const InputContainer = styled.div`
  position: relative;
`

const Close = styled.a.attrs({
  role: 'button',
})`
  position: absolute;
  top: 0;
  right: 0;
  padding: ${inputPadding}; // TODO
  text-align: center;
  font-weight: bold;
  font-size: ${props => props.theme.fontSizesIndexed.xs};
  color: ${props => props.theme.colors.gray.base};
  line-height: 1;
  border: 2px solid transparent;
  cursor: pointer;

  > span {
    position: absolute;
    top: 50%;
    right: -1;
    transform: translate(-50%, -50%);
    font-size: ${props => props.theme.fontSizesIndexed.lg};
  }
`

const ArrowContainer = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding: ${inputPadding};
  padding-right ${({ theme }) => theme.space[3]};
  display: flex;
  align-items: center;
  justify-content: center;
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
  query?: string
}

const TypeList: React.FC<TypeListProps> = ({ id, handleSelect, query }) => {
  const { data } = useQuery<ChannelTableTypes, ChannelTableTypesVariables>(
    channelTypesQuery,
    { variables: { id: id.toString() } }
  )

  const [matches, setMatches] = useState<ConnectableTypeEnum[] | null>(null)

  useEffect(() => {
    const items = query
      ? data?.channel?.types.filter(element => {
          if (element.toLowerCase().includes(query)) {
            return true
          }
        })
      : data?.channel?.types

    setMatches(items)
  }, [query, data, setMatches])

  return (
    <ResultContainer>
      {matches?.map(type => {
        return (
          <Item onClick={() => handleSelect(type)} key={type}>
            <Text f={1}>{type.toLowerCase()}</Text>
          </Item>
        )
      })}
    </ResultContainer>
  )
}

interface TypeFilterProps {
  id: string | number
  type?: ConnectableTypeEnum
  setType: (value: ConnectableTypeEnum) => void
}

const TypeFilter: React.FC<TypeFilterProps> = ({ id, setType, type }) => {
  const [query, setDebouncedQuery] = useState<string>('')
  const [mode, setMode] = useState<'active' | 'focused' | 'resting'>('resting')
  const [selectedType, setSelectedType] = useState<ConnectableTypeEnum | null>(
    type
  )

  const inputRef = useRef(null)
  const debounceQuery = useCallback(
    debounce(debouncedQuery => {
      setDebouncedQuery(debouncedQuery)
    }, 200),
    [setDebouncedQuery]
  )
  const handleChange = ({ target: { value: query } }) => {
    const mode = isEmpty(query) ? 'resting' : 'active'
    setMode(mode)
    debounceQuery(query)
  }

  const handleFocus = useCallback(() => {
    setMode('focused')
  }, [setMode])

  const handleBlur = useCallback(() => {
    setTimeout(() => setMode('resting'), 200)
  }, [setMode])

  const handleSelect = useCallback(type => {
    setSelectedType(type)
    setType(type)
    setMode('resting')
  }, [])

  const removeType = useCallback(() => {
    setType(null)
    setSelectedType(null)
    setMode('resting')
  }, [setSelectedType, setType, setMode])

  return (
    <SearchContainer>
      <InputContainer>
        <SearchInput
          ref={inputRef}
          key={selectedType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={'Select content type'}
          value={selectedType ? `Type: ${capitalize(selectedType)}` : null}
        />
        {!selectedType && (
          <ArrowContainer>
            <DownArrow />
          </ArrowContainer>
        )}
        {selectedType && (
          <Close onClick={removeType}>
            &nbsp;
            <span>&times;</span>
          </Close>
        )}
      </InputContainer>
      {(mode === 'focused' || mode === 'active') && (
        <TypeList id={id} query={query} handleSelect={handleSelect} />
      )}
    </SearchContainer>
  )
}

export default TypeFilter
