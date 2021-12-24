import React, { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { debounce, isEmpty } from 'underscore'

import { SearchInput } from '../FilterContainer'
import Box from 'v2/components/UI/Box'
import { ItemContainer } from '../FilterComponents'
import Text from 'v2/components/UI/Text'
import { inputPadding } from 'v2/components/UI/Inputs'

import channelConnectorsQuery from './queries/channelConnectors'
import {
  ChannelTableConnectors,
  ChannelTableConnectorsVariables,
  ChannelTableConnectors_channel_connectors,
} from '__generated__/ChannelTableConnectors'

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

const ResultContainer = styled(Box).attrs({
  position: 'absolute',
  width: '100%',
  zIndex: 1,
})``

const Item = styled(ItemContainer)`
  text-transform: capitalize;
`

interface UserListProps {
  id: string | number
  handleSelect: (value: ChannelTableConnectors_channel_connectors) => void
  query?: string
}

const UserList: React.FC<UserListProps> = ({ id, handleSelect, query }) => {
  const { data } = useQuery<
    ChannelTableConnectors,
    ChannelTableConnectorsVariables
  >(channelConnectorsQuery, { variables: { id: id.toString(), q: query } })

  return (
    <ResultContainer>
      {data?.channel?.connectors.map(c => {
        return (
          <Item onClick={() => handleSelect(c)} key={c.id}>
            <Text f={1}>{c.name}</Text>
          </Item>
        )
      })}
    </ResultContainer>
  )
}

interface UserFilterProps {
  id: string | number
  user?: ChannelTableConnectors_channel_connectors
  setUser: (value: ChannelTableConnectors_channel_connectors) => void
}

const UserFilter: React.FC<UserFilterProps> = ({ id, setUser, user }) => {
  const [query, setDebouncedQuery] = useState<string>(null)
  const [mode, setMode] = useState<'active' | 'focused' | 'resting'>('resting')
  const [
    selectedUser,
    setSelectedUser,
  ] = useState<ChannelTableConnectors_channel_connectors | null>(user)

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
    // setMode('resting')
  }, [setMode])

  const handleSelect = useCallback(user => {
    setSelectedUser(user)
    setUser(user)
    setMode('resting')
  }, [])

  const removeType = useCallback(() => {
    setUser(null)
    setSelectedUser(null)
    // setDebouncedQuery(null)
    setMode('resting')
  }, [setSelectedUser, setUser, setMode, setDebouncedQuery])

  return (
    <SearchContainer>
      <InputContainer>
        <SearchInput
          ref={inputRef}
          key={selectedUser?.id}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={'Select person'}
          value={selectedUser ? `Person: ${selectedUser.name}` : null}
        />
        {selectedUser && (
          <Close onClick={removeType}>
            &nbsp;
            <span>&times;</span>
          </Close>
        )}
      </InputContainer>
      {(mode === 'focused' || mode === 'active') && (
        <UserList id={id} query={query} handleSelect={handleSelect} />
      )}
    </SearchContainer>
  )
}

export default UserFilter
