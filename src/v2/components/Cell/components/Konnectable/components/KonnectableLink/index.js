import React, { PureComponent } from 'react'
import { propType } from 'graphql-anywhere'

import konnectableLinkFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableLink/fragments/konnectableLink'

import KonnectableGeneric from 'v2/components/Cell/components/Konnectable/components/KonnectableGeneric'

export default class Link extends PureComponent {
  static propTypes = {
    link: propType(konnectableLinkFragment).isRequired,
  }

  render() {
    const { link, ...rest } = this.props

    return (
      <KonnectableGeneric
        src={link.src}
        title={link.title}
        borderColor="gray.hint"
        {...rest}
      />
    )
  }
}
