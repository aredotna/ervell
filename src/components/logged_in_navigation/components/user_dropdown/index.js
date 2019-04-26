import React from 'react'

import { mountWithApolloProvider } from 'v2/apollo'
import unmount from 'v2/util/unmount'

import Overlay from 'v2/components/UI/Overlay'
import UserDropdown from 'v2/components/UserDropdown'

const STATE = {
  isOpened: false,
}

const OverlaidUserDropdown = ({ targetEl, close }) => (
  <Overlay
    onClose={close}
    targetEl={() => targetEl}
    alignToY="bottom"
    alignToX="right"
    anchorY="top"
    anchorX="right"
    offsetY={0}
    offsetX={10}
  >
    <UserDropdown />
  </Overlay>
)

export default targetEl => {
  if (!targetEl) return

  const el = document.createElement('div')

  const close = () => {
    unmount(el)
    el.parentNode && el.parentNode.removeChild(el)

    setTimeout(() => (STATE.isOpened = false), 0)
  }

  targetEl.addEventListener('click', e => {
    e.preventDefault()

    if (STATE.isOpened) return

    mountWithApolloProvider(OverlaidUserDropdown, { targetEl, close }, el)

    STATE.isOpened = true
  })
}
