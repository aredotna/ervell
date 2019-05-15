import React, { PureComponent } from 'react'
import { propType } from 'graphql-anywhere'

import konnectableImageFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableImage/fragments/konnectableImage'

import KonnectableGeneric from 'v2/components/Cell/components/Konnectable/components/KonnectableGeneric'

export default class KonnectableImage extends PureComponent {
  static propTypes = {
    image: propType(konnectableImageFragment).isRequired,
  }

  render() {
    const { image, ...rest } = this.props

    return <KonnectableGeneric src={image.src} title={image.title} {...rest} />
  }
}
