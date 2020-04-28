import React, { Component } from 'react'
import PropTypes from 'prop-types'

import WithCurrentRoute from 'v2/hocs/WithCurrentRoute'

class LinkUnlessCurrent extends Component {
  static propTypes = {
    currentRoute: PropTypes.shape({
      href: PropTypes.string.isRequired,
    }).isRequired,
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    predicate: PropTypes.func,
  }

  static defaultProps = {
    predicate: null,
  }

  isCurrent = () => {
    const {
      predicate,
      href: targetHref,
      currentRoute,
      currentRoute: { href: currentHref },
    } = this.props

    if (predicate) {
      return predicate({ targetHref, currentRoute })
    }

    return targetHref === currentHref
  }

  render() {
    const {
      href,
      children,
      predicate: _predicate,
      currentRoute: _currentRoute,
      ...rest
    } = this.props

    return (
      <a {...(!this.isCurrent() && { href })} {...rest}>
        {children}
      </a>
    )
  }
}

export default WithCurrentRoute(LinkUnlessCurrent)
