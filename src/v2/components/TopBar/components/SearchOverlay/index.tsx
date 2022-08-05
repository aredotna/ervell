import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import constants from 'v2/styles/constants'
import useWindowDimensions from 'v2/hooks/useWindowDimensions'

const Container = styled(Box)`
  position: fixed;
  top: ${constants.topBarHeight};
  bottom: 0;
  left: 0;
  right: 0;

  ${props =>
    props.debug &&
    `
    background-color: rgba(255, 0, 0, 0.1);
  `}
`

const Inner = styled(Box)`
  position: relative;
  width: ${props => props.width};
  ${props =>
    props.debug &&
    `
    background-color: rgba(255, 0, 0, 0.1);
  `}
`

interface SearchOverlayProps {
  targetElement: HTMLElement
  onOuterClick: () => void
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  children,
  targetElement,
  onOuterClick,
}) => {
  const { width: calcedWidth } = targetElement.getBoundingClientRect()
  const [width, setWidth] = useState(calcedWidth)

  const { width: windowWidth } = useWindowDimensions()

  useEffect(() => {
    const { width: calcedWidth } = targetElement.getBoundingClientRect()
    setWidth(calcedWidth)
  }, [windowWidth])

  const handleClick = useCallback((e: React.MouseEvent<Element>) => {
    if (e.target === e.currentTarget) {
      onOuterClick()
    }
  }, [])

  return (
    <Container onClick={handleClick}>
      <Inner width={width}>{children}</Inner>
    </Container>
  )
}

export default SearchOverlay
