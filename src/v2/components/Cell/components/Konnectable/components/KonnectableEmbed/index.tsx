import React from 'react'

import { KonnectableEmbed as KonnectableEmbedData } from '__generated__/KonnectableEmbed'

import KonnectableGeneric from 'v2/components/Cell/components/Konnectable/components/KonnectableGeneric'

interface Props {
  embed: KonnectableEmbedData
}

const KonnectableEmbed: React.FC<Props> = ({ embed, ...rest }) => (
  <KonnectableGeneric src={embed.src} title={embed.title} {...rest} />
)

export default KonnectableEmbed
