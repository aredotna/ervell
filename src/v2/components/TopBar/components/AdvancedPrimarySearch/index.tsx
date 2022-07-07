import React, { useCallback, useContext, useRef, useState } from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import HomeLink from 'v2/components/TopBar/components/PrimarySearch/components/HomeLink'
// import Overlay from 'v2/components/UI/Overlay'
import SearchInput, { ICON_OFFSET } from 'v2/components/UI/SearchInput'

import { PageContext, PageTypeEnum } from 'v2/components/PageContext'
import { AdvancedSearchContext } from 'v2/components/AdvancedSearch/AdvancedSearchContext'
import Text from 'v2/components/UI/Text'
import constants from 'v2/styles/constants'
import { WhereEnum } from '__generated__/globalTypes'
import { useNavigate } from 'react-router'

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
`

const ContextButton = styled(Text)`
  background-color: ${p => p.theme.colors.gray.light};
  padding: ${p => p.theme.space[1]} ${p => p.theme.space[2]};
  border-radius: ${constants.radii.regular};
  margin-right: ${p => p.theme.space[6]};
  cursor: pointer;
`

// const Results = styled(Box)`
//   height: 100%;
//   ${overflowScrolling}
// `

const AdvancedPrimarySearchContainer: React.FC<{
  scheme: 'DEFAULT' | 'GROUP'
  flex?: number
}> = ({ scheme, flex, ...rest }) => {
  const { page } = useContext(PageContext)
  const navigate = useNavigate()
  const { state, updateQuery, addFilter, generateUrl } = useContext(
    AdvancedSearchContext
  )
  const searchInputRef = useRef(null)
  const searchRef = useRef(null)
  const [mode, setMode] = useState<'resting' | 'blur' | 'focus' | 'hover'>(
    state.query ? 'blur' : 'resting'
  )

  const handleFocus = useCallback(() => {
    setMode('focus')
  }, [mode, setMode])
  const handleBlur = useCallback(() => {
    if (state.query) {
      setMode('blur')
      return
    }
    setMode('resting')
  }, [state, mode, setMode])
  const handleKeyDown = useCallback(
    ({ key }) => {
      if (key === 'Enter') {
        navigate(generateUrl())
      }
    },
    [navigate, state]
  )
  const handleMouseEnter = useCallback(() => {
    // if (mode === 'resting') {
    //   setMode('hover')
    // }
  }, [mode, setMode])
  const handleMouseLeave = useCallback(() => {
    if (mode === 'hover') {
      setMode('resting')
    }
  }, [mode, setMode])

  const onContextButtonClick = useCallback(() => {
    if (page.type === PageTypeEnum.PERSON) {
      searchInputRef.current.focus()
      addFilter('where', WhereEnum.USER, parseInt(page.id))
    }
  }, [page, addFilter, searchInputRef])

  return (
    <Container flex={1} {...rest}>
      {mode === 'resting' && <HomeLink />}

      <SearchInput
        globallyFocusOnKey="/"
        tabIndex={0}
        flex={1}
        py={6}
        bg={scheme === 'GROUP' && 'transparent'}
        border={0}
        query={state.query}
        onQueryChange={updateQuery}
        ref={searchRef}
        searchInputRef={searchInputRef}
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

      {mode === 'resting' && (
        <ContextButtonContainer>
          <ContextButton>Search Are.na</ContextButton>

          {page?.type === PageTypeEnum.CHANNEL ||
            (page?.type === PageTypeEnum.PERSON && (
              <ContextButton onClick={onContextButtonClick}>
                Search this {page.type.toLowerCase()}
              </ContextButton>
            ))}
        </ContextButtonContainer>
      )}
    </Container>
  )
}

export default AdvancedPrimarySearchContainer
