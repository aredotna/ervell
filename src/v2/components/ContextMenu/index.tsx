import React, { useState, useRef, useCallback } from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Icons from 'v2/components/UI/Icons'
import Overlay from 'v2/components/UI/Overlay'
import { ContextMenuOptions } from './components/ContextMenuOptions'
import { ContextMenuOption } from './components/ContextMenuOption'
import { ContextMenuDivider } from './components/ContextMenuDivider'

const Toggle = styled(Box).attrs({
  role: 'button',
  tabIndex: 0,
})`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  cursor: pointer;
  user-select: none;

  &:hover svg {
    fill: black;
  }
`

export const ContextMenu = ({ children, ...rest }) => {
  const [mode, setMode] = useState('resting')

  const openMenu = useCallback(e => {
    e.preventDefault()
    e.stopPropagation()
    setMode('open')
  }, [])

  const closeMenu = useCallback(e => {
    e.preventDefault()
    e.stopPropagation()
    setMode('resting')
  }, [])

  const targetEl = useRef(null)

  return (
    <>
      <Toggle
        ref={targetEl}
        onClick={{ open: closeMenu, resting: openMenu }[mode]}
        {...rest}
      >
        <Icons name="Ellipsis" color="gray.medium" />
      </Toggle>

      {mode === 'open' && (
        <Overlay
          onClose={closeMenu}
          targetEl={() => targetEl.current}
          alignToY="bottom"
          alignToX="right"
          anchorY="top"
          anchorX="right"
          offsetY={5}
          offsetX={0}
          disableTarget
        >
          <ContextMenuOptions onClose={closeMenu}>
            {children}
          </ContextMenuOptions>
        </Overlay>
      )}
    </>
  )
}

ContextMenu.Option = ContextMenuOption
ContextMenu.Divider = ContextMenuDivider
