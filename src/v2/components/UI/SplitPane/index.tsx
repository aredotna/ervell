import React, { useEffect, useState, createRef } from 'react'
import ReactSplitPane, { Props as ReactSplitPaneProps } from 'react-split-pane'
import styled from 'styled-components'

import { isMobile as checkIfMobile } from 'v2/util/isMobile'

import constants from 'v2/styles/constants'
import { getSpace } from 'v2/styles/functions'

import Box from 'v2/components/UI/Box'
import { LightboxContext, LightboxLayout } from 'v2/components/BlockLightbox'

interface SplitPaneProps extends ReactSplitPaneProps {
  context: LightboxContext
  layout: LightboxLayout
  children: any
}

const MIN_PANEL_WIDTH = {
  pct: '28%',
  px: '200px',
}

export const SplitPane: React.FC<SplitPaneProps> = ({
  children,
  context,
  layout,
  ...rest
}) => {
  const [panelSize, setPanelSize] = useState(undefined)
  const [windowResize, setWindowResize] = useState(false)
  const [isMobile] = useState(checkIfMobile())
  const splitPane = createRef<
    ReactSplitPane & {
      state: { draggedSize: number }
      pane1: { clientWidth: number }
    }
  >()
  const isFullScreen = layout === 'FULLSCREEN'
  const minSize = isFullScreen ? 0 : panelSize || MIN_PANEL_WIDTH.pct
  const sizeAfterUpdate = windowResize ? panelSize : undefined

  /**
   * Add window resize handlers
   */
  useEffect(() => {
    window.addEventListener('resize', updateSize)

    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  /**
   * Check to see if resize process is at rest
   */
  useEffect(() => {
    if (windowResize) {
      setWindowResize(false)
    }
  }, [windowResize])

  function updateSize() {
    setWindowResize(true)
  }

  /**
   * Update splitpane width percentages when dragging window
   */
  function handleDrag() {
    const {
      state: { draggedSize },
      pane1: { clientWidth },
    } = splitPane.current

    if (draggedSize && clientWidth) {
      const pct = draggedSize / window.innerWidth
      const size = `${pct * 100}%`

      setPanelSize(size)
    }
  }

  /**
   * Exit early if mobile
   */
  if (isMobile) {
    return children
  }

  return (
    <Container
      context={context}
      isFullScreen={isFullScreen}
      panelSize={panelSize}
    >
      <ReactSplitPane
        split="vertical"
        primary="second"
        allowResize={!isFullScreen}
        ref={splitPane}
        defaultSize={panelSize || minSize}
        minSize={minSize}
        size={isFullScreen ? '0%' : sizeAfterUpdate}
        step={5}
        onChange={handleDrag}
        {...rest}
      >
        {children}
      </ReactSplitPane>
    </Container>
  )
}

const Container = styled(Box)<{
  context: LightboxContext
  isFullScreen: boolean
  panelSize: string | number
}>`
  position: absolute;
  width: 100%;
  height: ${props =>
    props.context === 'PAGE'
      ? `calc(100% - ${constants.topBarHeight})`
      : '100%'};

  /**
    Styles for react-split-pane library
   */
  .Pane1 {
    display: flex;
  }

  .Pane2 {
    min-width: ${props => (props.isFullScreen ? 0 : MIN_PANEL_WIDTH.px)};
  }

  .Resizer {
    cursor: ${props => (props.isFullScreen ? 'inherit' : 'col-resize')};
    position: ${props => (props.isFullScreen ? 'absolute' : 'relative')};
    padding-left: ${getSpace(5)};
    padding-right: ${getSpace(5)};
    left: ${getSpace(6)};
    z-index: 2;

    opacity: 0;

    &:hover {
      opacity: 1;
    }

    &:after {
      border-left: 1px solid ${props => props.theme.colors.gray.light};
      content: '';
      display: flex;
      position: relative;
      width: 1px;
      height: 100%;
    }
  }

  ${constants.media.mobile`
    .SplitPane {
      flex-direction: column !important;
      overflow: scroll !important;

      .Pane1,
      .Pane2 {
        width: 100% !important;
      }
      .Resizer {
        display: none !important;
      }
    }
  `};
`
