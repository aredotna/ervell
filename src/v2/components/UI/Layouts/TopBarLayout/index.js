import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import BlankLayout from 'v2/components/UI/Layouts/BlankLayout'
import { GlobalNavElements } from 'v2/components/GlobalNavElements'

export default class TopBarLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    scheme: PropTypes.oneOf(['DEFAULT', 'GROUP']),
  }

  static defaultProps = {
    scheme: 'DEFAULT',
  }

  render() {
    const { children, scheme, ...rest } = this.props

    return (
      <BlankLayout {...rest}>
        <GlobalNavElements scheme={scheme} />

        <main>{children}</main>
      </BlankLayout>
    )
  }
}
