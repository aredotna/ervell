import React, {
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import Cookies from 'cookies-js'

import Box from 'v2/components/UI/Box'

import HomeLink from 'v2/components/TopBar/components/PrimarySearch/components/HomeLink'
import { ICON_OFFSET } from 'v2/components/UI/SearchInput'

import { PageContext, PageTypeEnum } from 'v2/components/PageContext'
import { AdvancedSearchContext } from 'v2/components/AdvancedSearch/AdvancedSearchContext'
import Text from 'v2/components/UI/Text'
import constants from 'v2/styles/constants'
import { WhereEnum } from '__generated__/globalTypes'
import { overflowScrolling } from 'v2/styles/mixins'
import { AdvancedSearchResultsContainer } from './components/AdvancedSearchResults'
import { AdvancedSearchFilter } from './components/AdvancedSearchFilter'
import FilterMenuToggle from './components/AdvancedFilterMenuToggle'
import SearchOverlay from '../SearchOverlay'
import AdvancedSearchInput from './components/AdvancedSearchInput'
import { isEmpty } from 'lodash'
import useSerializedMe from 'v2/hooks/useSerializedMe'
import AdvancedSearchReturnLabel from './components/AdvancedSearchReturnLabel'
import { useLocation, useNavigate } from 'react-router'
import { useQuery } from '@apollo/client'
import { TopBarUiStateQuery } from '__generated__/TopBarUiStateQuery'
import topBarUiStateQuery from './queries/topBarUiStateQuery'
import { AdvancedQuickSearchResult } from '__generated__/AdvancedQuickSearchResult'
import useRecentSearches from 'v2/hooks/useRecentSearches'

const Container = styled(Box)`
  position: relative;
  display: flex;
  align-items: stretch;
`

const ContextButtonContainer = styled(Box)`
  position: absolute;
  left: ${ICON_OFFSET};
  display: flex;
  align-items: center;
  height: 100%;
  width: calc(100% - ${ICON_OFFSET});
  pointer-events: none;
`

const ContextButton = styled(Text)`
  background-color: ${p => p.theme.colors.background};
  padding: ${p => p.theme.space[1]} ${p => p.theme.space[5]};
  cursor: pointer;
  pointer-events: all;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.theme.colors.gray.medium};
  border-bottom-right-radius: ${p => p.theme.radii.regular};
  cursor: text;

  &:not(:first-child) {
    border-bottom-left-radius: ${p => p.theme.radii.regular};
  }

  &:hover {
    background-color: ${p => p.theme.colors.gray.hint};
    color: ${p => p.theme.colors.gray.base};
  }

  ${props =>
    props.mode == 'hover' &&
    `
    background-color: ${props.theme.colors.gray.hint} !important;
    color: ${p => p.theme.colors.gray.bold};
  `}
`

const Controls = styled(Box)`
  position: absolute;
  right: 0;
  height: ${constants.topBarHeight};
  transform: translateY(-100%);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: ${p => p.theme.space[2]};
  z-index: 1000;
`

const Results = styled(Box)`
  height: 100%;
  ${overflowScrolling}
`

const AdvancedPrimarySearchContainer: React.FC<{
  scheme: 'DEFAULT' | 'GROUP'
  flex?: number
}> = ({ scheme, flex, ...rest }) => {
  const { page } = useContext(PageContext)
  const {
    state,
    updateQuery,
    addFilter,
    resetAll,
    generateUrl,
    removeFilter,
  } = useContext(AdvancedSearchContext)
  const { slug: currentUserId } = useSerializedMe()

  const { data, refetch } = useQuery<TopBarUiStateQuery>(topBarUiStateQuery)

  const searchInputRef = useRef(null)
  const searchRef = useRef(null)
  const containerRef = useRef(null)
  const [mode, setMode] = useState<
    'resting' | 'blur' | 'focus' | 'hover' | 'active' | 'hoverSecondary'
  >(state.query ? 'blur' : 'resting')
  const [containerMode, setContainerMode] = useState<'resting' | 'hover'>(
    'resting'
  )

  const [filterOpen, setFilterOpen] = useState<boolean>(
    data.cookies.view == 'true' || false
  )
  const [anyResultHighlighted, setAnyResultHighlighted] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { addRecentSearch } = useRecentSearches()

  const toggleFilterOpen = useCallback(() => {
    try {
      Cookies.set(`TopBar--filterState`, !filterOpen)
      refetch()
    } catch (err) {
      console.error(err)
    }
    setFilterOpen(!filterOpen)
  }, [setFilterOpen, filterOpen, refetch])

  const handleFocus = useCallback(() => {
    state.variables?.where &&
      state.variables?.where[0]?.id &&
      isEmpty(state.query) &&
      removeFilter('where', state.variables.where[0]?.facet)
    isEmpty(state.query) ? setMode('focus') : setMode('active')
  }, [mode, setMode, state.query])

  const handleBlur = useCallback(
    (e: FocusEvent<Element>) => {
      console.log({ e })
    },
    [state, mode, setMode]
  )

  const onClose = useCallback(() => {
    if (state.query) {
      setMode('blur')
      return
    }
    setMode('resting')
    setContainerMode('resting')
  }, [state.query, setMode, setContainerMode])

  const handleMouseEnter = useCallback(() => {
    if (mode != 'resting') {
      return
    }
    setMode('hover')
    setContainerMode('hover')
  }, [mode, setMode, setContainerMode])

  const handleMouseLeave = useCallback(() => {
    if (mode != 'hover') {
      return
    }
    setContainerMode('resting')
    setMode('resting')
  }, [mode, setMode, setContainerMode])

  const onSearchButtonClick = useCallback(() => {
    searchInputRef.current.focus()
    setMode('focus')
  }, [])

  const onContextButtonClick = useCallback(() => {
    if (page.type === PageTypeEnum.PERSON) {
      searchInputRef.current.focus()
      page.id === currentUserId
        ? addFilter('where', WhereEnum.MY, currentUserId)
        : addFilter('where', WhereEnum.USER, page.id)
    }

    if (page.type === PageTypeEnum.CHANNEL) {
      searchInputRef.current.focus()
      addFilter('where', WhereEnum.CHANNEL, page.id)
    }

    if (page.type === PageTypeEnum.GROUP) {
      searchInputRef.current.focus()
      addFilter('where', WhereEnum.GROUP, page.id)
    }
    setMode('focus')
  }, [page, addFilter, searchInputRef])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        resetAll()
        onClose()
        searchInputRef.current.blur()
      }

      if (e.key === 'Enter' && !anyResultHighlighted) {
        onClose()
        addRecentSearch(state.variables)
        return navigate(generateUrl(false, pathname))
      }
    },
    [
      anyResultHighlighted,
      onClose,
      resetAll,
      generateUrl,
      addRecentSearch,
      setContainerMode,
    ]
  )

  const handleResultClick = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      result: AdvancedQuickSearchResult
    ) => {
      if (result) addRecentSearch(result)

      if (!e.metaKey) {
        resetAll()
        onClose()
      }
    },
    [addRecentSearch]
  )

  const onContainerMouseEnter = useCallback(() => {
    setContainerMode('hover')
  }, [])

  const onContainerMouseLeave = useCallback(() => {
    setContainerMode('resting')
  }, [])

  return (
    <Container
      onMouseEnter={onContainerMouseEnter}
      onMouseLeave={onContainerMouseLeave}
      ref={containerRef}
      flex={1}
      mode={mode}
      {...rest}
    >
      {containerMode == 'resting' && <HomeLink backgroundColor="gray.light" />}

      <AdvancedSearchInput
        tabIndex={0}
        flex={1}
        py={6}
        bg={scheme === 'GROUP' && 'transparent'}
        border={0}
        initialQuery={state.query}
        onQueryChange={updateQuery}
        ref={searchRef}
        searchInputRef={searchInputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onReset={resetAll}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        mode={mode}
        containerMode={containerMode}
      />

      {mode != 'focus' && mode != 'active' && !state.query && (
        <ContextButtonContainer>
          <ContextButton
            key={mode}
            onClick={onSearchButtonClick}
            mode={containerMode}
            onMouseEnter={onContainerMouseEnter}
            onMouseLeave={onContainerMouseLeave}
          >
            Search Are.na
          </ContextButton>

          {page?.type === PageTypeEnum.PERSON && page?.id !== currentUserId && (
            <ContextButton
              onClick={onContextButtonClick}
              onMouseEnter={onContainerMouseEnter}
              onMouseLeave={onContainerMouseLeave}
            >
              Search person&apos;s content
            </ContextButton>
          )}

          {page?.type === PageTypeEnum.PERSON && page?.id == currentUserId && (
            <ContextButton
              onClick={onContextButtonClick}
              onMouseEnter={onContainerMouseEnter}
              onMouseLeave={onContainerMouseLeave}
            >
              Search your content
            </ContextButton>
          )}

          {page?.type === PageTypeEnum.CHANNEL && (
            <ContextButton
              onClick={onContextButtonClick}
              onMouseEnter={onContainerMouseEnter}
              onMouseLeave={onContainerMouseLeave}
            >
              Search this {page.type.toLowerCase()}
            </ContextButton>
          )}

          {page?.type === PageTypeEnum.GROUP && (
            <ContextButton
              onClick={onContextButtonClick}
              onMouseEnter={onContainerMouseEnter}
              onMouseLeave={onContainerMouseLeave}
            >
              Search this {page.type.toLowerCase()}
            </ContextButton>
          )}
        </ContextButtonContainer>
      )}

      {(mode == 'focus' || mode == 'active') && (
        <SearchOverlay
          onOuterClick={onClose}
          targetElement={containerRef.current}
        >
          <Controls>
            {(mode === 'focus' || mode === 'active') &&
              !anyResultHighlighted && (
                <AdvancedSearchReturnLabel url={generateUrl(false, pathname)} />
              )}
            {(mode === 'focus' || mode === 'active') && !filterOpen && (
              <Box mr={5}>
                <FilterMenuToggle
                  open={filterOpen}
                  onClick={toggleFilterOpen}
                />
              </Box>
            )}
          </Controls>
          <Results>
            {filterOpen && (
              <AdvancedSearchFilter toggleOpen={toggleFilterOpen} />
            )}
            <AdvancedSearchResultsContainer
              onAnyResultHighlighted={setAnyResultHighlighted}
              onResultClick={handleResultClick}
            />
          </Results>
        </SearchOverlay>
      )}
    </Container>
  )
}

export default AdvancedPrimarySearchContainer
