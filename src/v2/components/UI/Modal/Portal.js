/* global this */

import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import ModalComponent from 'v2/components/UI/Modal/Modal'

export default class Modal extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    document.body.appendChild(this.el)
    document.body.style.overflow = 'hidden'
  }

  componentWillUnmount() {
    this.el.parentNode.removeChild(this.el)
    document.body.style.overflow = 'auto'
  }

  ModalComponent = ModalComponent

  render() {
    const { children, ...rest } = this.props

    return ReactDOM.createPortal(
      <this.ModalComponent {...rest}>{children}</this.ModalComponent>,
      this.el
    )
  }
}
