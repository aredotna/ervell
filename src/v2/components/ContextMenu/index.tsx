import React, { useState, useRef, useCallback } from 'react'

import Icons from 'v2/components/UI/Icons'
import Overlay from 'v2/components/UI/Overlay'
import { ContextToggle } from 'v2/components/UI/ContextToggle'
import { ContextMenuOptions } from './components/ContextMenuOptions'
import { ContextMenuOption } from './components/ContextMenuOption'
import { ContextMenuDivider } from './components/ContextMenuDivider'

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
      <ContextToggle
        ref={targetEl}
        onClick={{ open: closeMenu, resting: openMenu }[mode]}
        {...rest}
      >
        <Icons name="Ellipsis" color="gray.medium" />
      </ContextToggle>

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
