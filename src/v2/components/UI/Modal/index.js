import React from 'react'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

import { wrapWithProviders, initClientSideApolloClient } from 'v2/apollo'
import mount from 'v2/util/mount'
import unmount from 'v2/util/unmount'

import ModalComponent from 'v2/components/UI/Modal/Modal'

export default class Modal {
  ModalComponent = ModalComponent

  constructor(Component, props = {}, modalProps = {}) {
    this.Component = Component
    this.props = props
    this.modalProps = modalProps
    this.el = document.createElement('div')
  }

  open = () => {
    document.body.appendChild(this.el)

    const boot = wrapWithProviders(initClientSideApolloClient())
    const { onClose: _onClose, ...rest } = this.props
    const props = { onClose: this.close, ...rest }

    const ModalApp = innerProps => (
      <this.ModalComponent onClose={this.close} {...this.modalProps}>
        <this.Component {...innerProps} />
      </this.ModalComponent>
    )

    const App = boot(ModalApp, props)

    mount(App, this.el)
    disableBodyScroll(this.el)
  }

  close = (...args) => {
    if (this.props.onClose) {
      this.props.onClose(...args)
    }

    unmount(this.el)
    this.el.parentNode.removeChild(this.el)
    clearAllBodyScrollLocks()
  }
}
