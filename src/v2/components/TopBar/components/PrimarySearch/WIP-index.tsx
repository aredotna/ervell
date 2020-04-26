import React, { useState, useRef, useCallback } from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import HomeLink from 'v2/components/TopBar/components/PrimarySearch/components/HomeLink'
import Overlay from 'v2/components/UI/Overlay'
import SearchInput from 'v2/components/UI/SearchInput'
import PrimarySearchResults from 'v2/components/TopBar/components/PrimarySearch/components/PrimarySearchResults'

import { overflowScrolling } from 'v2/styles/mixins'

const Container = styled(Box)`
  position: relative;
  display: flex;
  align-items: stretch;
`

const Results = styled(Box)`
  height: 100%;
  ${overflowScrolling}
`

interface PrimarySearchProps {
  scheme: 'DEFAULT' | 'GROUP'
}

interface PrimarySearchState {
  mode: 'resting' | 'focus' | 'hover' | 'blur'
  debouncedQuery: string
  query: string
  cursor?: number
  href?: string
}

const defaultSearchState: PrimarySearchState = {
  mode: 'resting',
  debouncedQuery: '',
  query: '',
  cursor: null,
  href: null,
}

export const PrimarySearch: React.FC<PrimarySearchProps> = ({
  scheme,
  ...rest
}) => {
  const [state, setState] = useState<PrimarySearchState>(defaultSearchState)
  const searchInput = useRef()

  const { mode, query, debouncedQuery, cursor, href } = state

  const handleSelection = useCallback(href => setState({ ...state, href }), [
    state,
  ])

  const handleQuery = useCallback(
    query => {
      setState({ ...state, query, cursor: null })
    },
    [state]
  )

  const handleDebouncedQuery = useCallback(
    debouncedQuery => {
      setState({ ...state, debouncedQuery, cursor: null })
    },
    [state]
  )

  const handleBlur = useCallback(() => {
    if (query) {
      setState({ ...state, mode: 'blur' })
      return
    }

    setState({ ...state, mode: 'resting' })
  }, [state, query])

  const handleFocus = useCallback(() => setState({ ...state, mode: 'focus' }), [
    state,
  ])

  const handleKeyDown = useCallback(
    ({ key }) => {
      switch (key) {
        case 'Escape':
          setState({ ...state, query: '' })
          break
        case 'Enter':
          if (query === '') return
          window.location.href = href
          break
        case 'ArrowDown':
          setState({
            ...state,
            cursor: (cursor === null ? -1 : cursor) + 1,
          })
          break
        case 'ArrowUp':
          setState({
            ...state,
            cursor: (cursor === null ? 0 : cursor) - 1,
          })
          break
        default:
          break
      }
    },
    [state, query, cursor, href]
  )

  const handleMouseEnter = useCallback(() => {
    if (mode !== 'resting') return
    setState({ ...state, mode: 'hover' })
  }, [state, mode])

  const handleMouseLeave = useCallback(() => {
    if (mode !== 'hover') return
    setState({ ...state, mode: 'resting' })
  }, [state, mode])

  return (
    <Container {...rest}>
      {mode === 'resting' && <HomeLink />}

      <SearchInput
        globallyFocusOnKey="/"
        tabIndex={1}
        flex="1"
        py={6}
        placeholder="Search Are.na"
        bg={scheme === 'GROUP' && 'transparent'}
        border={0}
        query={query}
        onQueryChange={handleQuery}
        onDebouncedQueryChange={handleDebouncedQuery}
        // ref={searchInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        outlineless
        iconMap={{
          resting: null,
          focus: 'MagnifyingGlass',
          hover: 'MagnifyingGlass',
          active: 'X',
        }}
      />

      {query && mode === 'focus' && (
        <Overlay targetEl={() => searchInput.current} fullWidth>
          <Results>
            <PrimarySearchResults
              query={query}
              debouncedQuery={debouncedQuery}
              cursor={cursor}
              onSelection={handleSelection}
            />
          </Results>
        </Overlay>
      )}
    </Container>
  )
}
