import React, { PureComponent } from 'react'
import { propType } from 'graphql-anywhere'

import konnectableEmbedFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableEmbed/fragments/konnectableEmbed'

import KonnectableGeneric from 'v2/components/Cell/components/Konnectable/components/KonnectableGeneric'

export default class Embed extends PureComponent {
  static propTypes = {
    embed: propType(konnectableEmbedFragment).isRequired,
  }

  render() {
    const { embed, ...rest } = this.props

    return <KonnectableGeneric src={embed.src} title={embed.title} {...rest} />
  }
}
