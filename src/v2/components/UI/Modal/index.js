/* global this */

import React from 'react'

import { wrapWithProviders, initClientSideApolloClient } from 'v2/apollo'
import mount from 'v2/util/mount'
import unmount from 'v2/util/unmount'

import ModalComponent from 'v2/components/UI/Modal/Modal'

export default class Modal {
  ModalComponent = ModalComponent

  constructor(Component, props = {}, modalProps = {}) {
    if (!document) return null

    this.Component = Component
    this.props = props
    this.modalProps = modalProps
    this.el = document.createElement('div')
  }

  open = () => {
    if (!document) return null

    document?.body.appendChild(this.el)

    const boot = wrapWithProviders(initClientSideApolloClient())
    const { onClose: _onClose, ...rest } = this.props
    const props = { onClose: this.close, ...rest }

    const ModalApp = innerProps => (
      <this.ModalComponent onClose={this.close} {...this.modalProps}>
        <this.Component {...innerProps} />
      </this.ModalComponent>
    )

    const App = boot(ModalApp, props)
    document.body.style.overflow = 'hidden'
    mount(App, this.el)
  }

  close = (...args) => {
    if (!document) return null

    if (this.props.onClose) {
      this.props.onClose(...args)
    }

    unmount(this.el)
    this.el.parentNode.removeChild(this.el)
    document.body.style.overflow = 'auto'
  }
}
