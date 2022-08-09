import React, {
  FocusEvent,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'

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
import LargeLabeledCheckbox from 'v2/components/UI/Inputs/components/LargeLabelledCheckbox'
import { AdvancedSearchFilter } from './components/AdvancedSearchFilter'
import FilterMenuToggle from './components/AdvancedFilterMenuToggle'
import SearchOverlay from '../SearchOverlay'
import AdvancedSearchInput from './components/AdvancedSearchInput'
import { isEmpty } from 'lodash'

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
  background-color: ${p => p.theme.colors.gray.light};
  padding: ${p => p.theme.space[1]} ${p => p.theme.space[2]};
  border-radius: ${constants.radii.regular};
  margin-right: ${p => p.theme.space[6]};
  cursor: pointer;
  pointer-events: all;

  &:hover {
    background-color: ${p => p.theme.colors.gray.semiLight};
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
  const { state, updateQuery, addFilter, resetAll } = useContext(
    AdvancedSearchContext
  )
  const searchInputRef = useRef(null)
  const searchRef = useRef(null)
  const containerRef = useRef(null)
  const [mode, setMode] = useState<
    'resting' | 'blur' | 'focus' | 'hover' | 'active'
  >(state.query ? 'blur' : 'resting')

  const [filterOpen, setFilterOpen] = useState(false)

  const toggleFilterOpen = useCallback(() => {
    setFilterOpen(!filterOpen)
  }, [setFilterOpen, filterOpen])

  const [includeOriginalResults, setIncludeOriginalResults] = useState<boolean>(
    false
  )

  const handleFocus = useCallback(() => {
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
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (mode === 'resting') {
      setMode('hover')
    }
  }, [mode, setMode])

  const handleMouseLeave = useCallback(() => {
    if (mode === 'hover') {
      setMode('resting')
    }
  }, [mode, setMode])

  const onSearchButtonClick = useCallback(() => {
    searchInputRef.current.focus()
    setMode('focus')
  }, [])

  const onContextButtonClick = useCallback(() => {
    if (page.type === PageTypeEnum.PERSON) {
      searchInputRef.current.focus()
      addFilter('where', WhereEnum.USER, page.id)
    }

    if (page.type === PageTypeEnum.CHANNEL) {
      searchInputRef.current.focus()
      addFilter('where', WhereEnum.CHANNEL, page.id)
    }

    if (page.type === PageTypeEnum.GROUP) {
      searchInputRef.current.focus()
      addFilter('where', WhereEnum.GROUP, page.id)
    }
  }, [page, addFilter, searchInputRef])

  return (
    <Container
      ref={containerRef}
      flex={1}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {(mode === 'resting' || mode === 'blur' || mode === 'hover') && (
        <HomeLink />
      )}

      <AdvancedSearchInput
        // globallyFocusOnKey="/"
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
        mode={mode}
      />

      {mode != 'focus' &&
        mode != 'active' &&
        !state.query &&
        !includeOriginalResults && (
          <ContextButtonContainer>
            <ContextButton onClick={onSearchButtonClick}>
              Search Are.na
            </ContextButton>

            {page?.type === PageTypeEnum.PERSON && (
              <ContextButton onClick={onContextButtonClick}>
                Search this {page.type.toLowerCase()}
              </ContextButton>
            )}

            {page?.type === PageTypeEnum.CHANNEL && (
              <ContextButton onClick={onContextButtonClick}>
                Search this {page.type.toLowerCase()}
              </ContextButton>
            )}

            {page?.type === PageTypeEnum.GROUP && (
              <ContextButton onClick={onContextButtonClick}>
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
            {(mode === 'focus' || mode === 'active') && !filterOpen && (
              <Box mr={5}>
                <FilterMenuToggle
                  open={filterOpen}
                  onClick={toggleFilterOpen}
                />
              </Box>
            )}

            <LargeLabeledCheckbox
              f={1}
              checked={includeOriginalResults}
              onChange={() =>
                setIncludeOriginalResults(!includeOriginalResults)
              }
            >
              Use quicksearch results
            </LargeLabeledCheckbox>
          </Controls>
          <Results>
            {filterOpen && (
              <AdvancedSearchFilter toggleOpen={toggleFilterOpen} />
            )}
            <AdvancedSearchResultsContainer
              includeOriginalResults={includeOriginalResults}
            />
          </Results>
        </SearchOverlay>
      )}
    </Container>
  )
}

export default AdvancedPrimarySearchContainer
