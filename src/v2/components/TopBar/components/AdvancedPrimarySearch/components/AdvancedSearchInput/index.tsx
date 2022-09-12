import React, {
  FocusEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import Mousetrap from 'mousetrap'
import styled from 'styled-components'
import { debounce, pick, omit } from 'underscore'
import compactObject from 'v2/util/compactObject'

import Box, { BoxProps } from 'v2/components/UI/Box'
import { IconMap, OUTER_PROPS_KEYS } from 'v2/components/UI/SearchInput'
import { Input } from 'v2/components/UI/Inputs'
import Icons from 'v2/components/UI/Icons'
import { IconState, TopBarMode } from '../../advancedPrimarySearchReducer'
import { color } from 'styled-system'

export const ICON_OFFSET = '3.125em'

const Container = styled(Box)`
  ${color}
  position: relative;

  ${props =>
    (props.mode === 'active' ||
      props.mode === 'focus' ||
      props.containerMode == 'hover') &&
    `
    background-color: ${props.theme.colors.gray.hint};
  `}
`

const Icon = styled(Box)`
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
  mode?: TopBarMode
  icon?: IconState
  iconBg?: string
  iconRef?: React.RefObject<HTMLDivElement>
  containerBg?: string
  onQueryChange?: (query: string) => void
  onDebouncedQueryChange?: (query: string) => void
  onHover?: (event: MouseEvent<HTMLDivElement, MouseEvent>) => void
  onLeave?: (event: MouseEvent<HTMLDivElement, MouseEvent>) => void
  onFocus?: () => void
  onReset?: () => void
  onBlur?: (e: FocusEvent<Element>) => void
  iconMap?: IconMap
  searchContainerRef?: React.RefObject<HTMLDivElement>
  searchInputRef?: any
}

export const AdvancedSearchInput: React.FC<AdvancedSearchInputProps &
  BoxProps> = ({
  initialQuery,
  onQueryChange,
  onDebouncedQueryChange,
  onHover,
  onLeave,
  onFocus,
  onBlur,
  onReset,
  mode,
  icon,
  iconBg,
  iconRef,
  searchInputRef,
  searchContainerRef,
  containerBg,
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

  const handleMouseEnter = useCallback(
    (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
      onHover && onHover(e)
    },
    [onHover]
  )

  const handleMouseLeave = useCallback(
    (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
      onHover && onLeave(e)
    },
    [onHover]
  )

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
      ref={searchContainerRef}
      bg={containerBg}
      {...outerProps}
    >
      {icon && (
        <Icon onClick={handleReset} bg={iconBg} ref={iconRef}>
          <Icons
            width="1.5em"
            height="0.88em"
            color="gray.medium"
            name={icon}
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
