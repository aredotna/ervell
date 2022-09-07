import React, { FocusEvent, useCallback, useEffect, useState } from 'react'
import Mousetrap from 'mousetrap'
import styled from 'styled-components'
import { debounce, pick, omit } from 'underscore'
import compactObject from 'v2/util/compactObject'

import Box, { BoxProps } from 'v2/components/UI/Box'
import { IconMap, OUTER_PROPS_KEYS } from 'v2/components/UI/SearchInput'
import { Input } from 'v2/components/UI/Inputs'
import Icons from 'v2/components/UI/Icons'

export const ICON_OFFSET = '3.125em'

const Container = styled(Box)`
  position: relative;

  ${props =>
    (props.mode === 'active' || props.mode === 'focus') &&
    `
    background-color: ${props.theme.colors.gray.hint};
  `}
`

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${ICON_OFFSET};
  cursor: pointer;

  ${props =>
    props.containerMode === 'hover' &&
    `
    background-color: ${props.theme.colors.gray.hint};
  `}
`

interface AdvancedSearchInputProps extends BoxProps {
  initialQuery?: string
  mode?: 'resting' | 'blur' | 'focus' | 'hover' | 'active' | 'hoverSecondary'
  containerMode?: 'resting' | 'hover'
  onQueryChange?: (query: string) => void
  onDebouncedQueryChange?: (query: string) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onFocus?: () => void
  onReset?: () => void
  onBlur?: (e: FocusEvent<Element>) => void
  iconMap?: IconMap
  searchInputRef?: any
}

export const AdvancedSearchInput: React.FC<AdvancedSearchInputProps &
  BoxProps> = ({
  initialQuery,
  onQueryChange,
  onDebouncedQueryChange,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onReset,
  mode,
  searchInputRef,
  iconMap = {
    resting: null,
    blur: null,
    hover: 'MagnifyingGlass',
    hoverSecondary: 'MagnifyingGlass',
    focus: 'MagnifyingGlass',
    active: 'X',
  },
  containerMode,
  ...rest
}) => {
  const [query, setQuery] = useState<string>(initialQuery || '')
  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleDebouncedQueryChange = useCallback(
    debounce(onDebouncedQueryChange, 500),
    [onDebouncedQueryChange]
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    onQueryChange && onQueryChange(e.target.value)
    handleDebouncedQueryChange && handleDebouncedQueryChange(e.target.value)
  }

  const handleMouseEnter = useCallback(() => {
    onMouseEnter && onMouseEnter()
  }, [onMouseEnter])

  const handleMouseLeave = useCallback(() => {
    onMouseLeave && onMouseLeave()
  }, [onMouseLeave])

  const handleReset = useCallback(() => {
    searchInputRef.current.focus()
    onReset && onReset()
  }, [onReset])

  const handleFocus = useCallback(() => {
    onFocus && onFocus()
  }, [onFocus])

  const handleBlur = useCallback(
    (e: React.FocusEvent) => {
      onBlur && onBlur(e)
    },
    [onBlur]
  )

  useEffect(() => {
    Mousetrap.bind('/', event => {
      event.preventDefault()
      handleFocus()
      searchInputRef.current.focus()
      searchInputRef.current.value = ''
    })

    return () => {
      Mousetrap.unbind('/')
    }
  }, [searchInputRef, handleFocus])

  const outerProps = compactObject(pick(rest, ...OUTER_PROPS_KEYS))
  const innerProps = omit(rest, ...OUTER_PROPS_KEYS)

  return (
    <Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      mode={mode}
      containerMode={containerMode}
      {...outerProps}
    >
      {iconMap[containerMode] && (
        <Icon
          mode={containerMode}
          containerMode={containerMode}
          onClick={handleReset}
        >
          <Icons
            width="1.5em"
            height="0.88em"
            color="gray.medium"
            name={iconMap[containerMode]}
          />
        </Icon>
      )}

      <Input
        ref={searchInputRef}
        width="100%"
        px={ICON_OFFSET}
        borderColor="gray.regular"
        {...innerProps}
        outlineless
        backgroundless
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        defaultValue={query}
        autoCorrect="off"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck="false"
        value={query}
      />
    </Container>
  )
}

export default AdvancedSearchInput
