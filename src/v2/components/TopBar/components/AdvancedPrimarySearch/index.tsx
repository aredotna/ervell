import React, {
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  Reducer,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import Cookies from 'cookies-js'
import { color } from 'styled-system'

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
import { useLocation, useNavigate } from 'react-router'
import { useQuery } from '@apollo/client'
import { TopBarUiStateQuery } from '__generated__/TopBarUiStateQuery'
import topBarUiStateQuery from './queries/topBarUiStateQuery'
import { AdvancedQuickSearchResult } from '__generated__/AdvancedQuickSearchResult'
import useRecentSearches from 'v2/hooks/useRecentSearches'
import {
  advancedPrimarySearchReducer,
  initialTopBarState,
  TopBarAction,
  TopBarState,
} from './advancedPrimarySearchReducer'
import {
  Copy,
  Message,
  QuestionMarkOverlay,
} from 'v2/components/UI/QuestionMarkOverlay'

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
  z-index: 1;

  ${constants.media.small`
    display: none;
  `}
`

const ContextButton = styled(Text)`
  background-color: transparent;
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

  ${color}

  &:not(:first-child) {
    border-bottom-left-radius: ${p => p.theme.radii.regular};
  }

  &:hover {
    color: ${p => p.theme.colors.gray.bold};
  }
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

  ${constants.media.small`
    transform: translateY(0);
  `}
`

const Results = styled(Box)`
  height: 100%;
  ${overflowScrolling}
`

const BetaMessage = styled(Message).attrs({
  border: '1px solid',
  borderColor: 'white',
  bg: 'state.supporter',
  p: 4,
})`
  border-radius: ${props => props.theme.radii.regular};
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.25);
  overflow: hidden;
  max-width: 20em;
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

  const primaryButtonRef = useRef(null)
  const secondaryButtonRef = useRef(null)
  const iconRef = useRef(null)

  const [topBarState, dispatch] = useReducer<
    Reducer<TopBarState, TopBarAction>
  >(advancedPrimarySearchReducer, {
    ...initialTopBarState,
    mode: !isEmpty(state.query) ? 'blurred' : 'resting',
    hasQuery: !isEmpty(state.query),
  })

  useEffect(() => {
    dispatch({
      type: 'CHANGE_QUERY',
      payload: !isEmpty(state.query),
    })
  }, [state.query])

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
    // Remove filter if we are focusing on the search input with a /
    state.variables?.where &&
      state.variables?.where[0]?.id &&
      isEmpty(state.query) &&
      removeFilter('where', state.variables.where[0]?.facet)

    dispatch({ type: 'FOCUS', payload: null })
  }, [state.query, dispatch])

  const handleBlur = useCallback(
    (e: FocusEvent<Element>) => {
      console.log({ e })
    },
    [state]
  )

  const onClose = useCallback(() => {
    dispatch({ type: 'CLOSE', payload: null })
  }, [state.query])

  const onSearchButtonClick = useCallback(() => {
    searchInputRef.current.focus()
  }, [])

  const handleHover = useCallback(
    (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target == primaryButtonRef.current) {
        dispatch({ type: 'MOUSEENTER_PRIMARY', payload: null })
      }

      if (e.target == secondaryButtonRef.current) {
        dispatch({ type: 'MOUSEENTER_SECONDARY', payload: null })
      }

      if (e.target == iconRef.current) {
        dispatch({ type: 'MOUSEENTER_ICON', payload: null })
      }

      if (
        e.target == containerRef.current ||
        e.target == searchRef.current ||
        e.target == searchInputRef.current
      ) {
        dispatch({ type: 'MOUSEENTER_CONTAINER', payload: null })
      }
    },
    [
      primaryButtonRef,
      secondaryButtonRef,
      iconRef,
      containerRef,
      searchRef,
      topBarState,
      dispatch,
    ]
  )

  const handleLeave = useCallback(
    (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
      dispatch({ type: 'MOUSELEAVE', payload: e })
    },
    [primaryButtonRef]
  )

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
    dispatch({ type: 'FOCUS', payload: null })
  }, [page, addFilter, searchInputRef])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        resetAll()
        onClose()
        searchInputRef.current.blur()
        dispatch({ type: 'CLEAR', payload: null })
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
      state.variables,
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

  return (
    <Container
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      ref={containerRef}
      flex={1}
      mode={topBarState.mode}
      {...rest}
    >
      {!topBarState.icon && <HomeLink backgroundColor="gray.light" />}

      <AdvancedSearchInput
        tabIndex={0}
        flex={1}
        py={6}
        bg={scheme === 'GROUP' && 'transparent'}
        border={0}
        initialQuery={state.query}
        onQueryChange={updateQuery}
        ref={searchRef}
        searchContainerRef={searchRef}
        searchInputRef={searchInputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onReset={resetAll}
        onKeyDown={handleKeyDown}
        onHover={handleHover}
        onLeave={handleLeave}
        icon={topBarState.icon}
        iconBg={topBarState.iconBgColor}
        iconRef={iconRef}
        containerBg={topBarState.containerBg}
        mode={topBarState.mode}
      />

      {topBarState.mode != 'active' && !state.query && (
        <ContextButtonContainer>
          <ContextButton
            onClick={onSearchButtonClick}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            ref={primaryButtonRef}
            bg={topBarState.primaryButtonBg}
          >
            Search Are.na
          </ContextButton>

          {page?.type === PageTypeEnum.PERSON && page?.id !== currentUserId && (
            <ContextButton
              onClick={onContextButtonClick}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              ref={secondaryButtonRef}
              bg={topBarState.secondaryButtonBg}
            >
              Search person&apos;s content
            </ContextButton>
          )}

          {page?.type === PageTypeEnum.PERSON && page?.id == currentUserId && (
            <ContextButton
              onClick={onContextButtonClick}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              ref={secondaryButtonRef}
              bg={topBarState.secondaryButtonBg}
            >
              Search your content
            </ContextButton>
          )}

          {page?.type === PageTypeEnum.CHANNEL && (
            <ContextButton
              onClick={onContextButtonClick}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              ref={secondaryButtonRef}
              bg={topBarState.secondaryButtonBg}
            >
              Search this {page.type.toLowerCase()}
            </ContextButton>
          )}

          {page?.type === PageTypeEnum.GROUP && (
            <ContextButton
              onClick={onContextButtonClick}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              ref={secondaryButtonRef}
              bg={topBarState.secondaryButtonBg}
            >
              Search this {page.type.toLowerCase()}
            </ContextButton>
          )}

          {/* TODO: Remove when we fully launch */}
          <QuestionMarkOverlay>
            <BetaMessage>
              <Copy>
                <strong>Advanced Search</strong>
              </Copy>
              <Copy>
                As a supporter, you get early access to our new advanced search
                features. We are still working on some details (date filters,
                for example), but we&apos;d be grateful to hear your feedback.
              </Copy>
              <Copy>Two options:</Copy>
              <Copy>
                <ol>
                  <li>
                    You can fill out{' '}
                    <a href="https://airtable.com/shrFiBKYHP1XeV2r8">
                      this feedback form
                    </a>
                    .
                  </li>
                  <li>
                    You can add feedback to the #supporter-council channel in
                    our <a href="https://www.are.na/settings/perks">Discord</a>.
                  </li>
                </ol>
              </Copy>
              <Copy>Thank you! We appreciate your support ✨</Copy>
            </BetaMessage>
          </QuestionMarkOverlay>
        </ContextButtonContainer>
      )}

      {topBarState.mode == 'active' && (
        <SearchOverlay
          onOuterClick={onClose}
          targetElement={containerRef.current}
        >
          <Controls>
            {topBarState.mode === 'active' && !filterOpen && (
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
