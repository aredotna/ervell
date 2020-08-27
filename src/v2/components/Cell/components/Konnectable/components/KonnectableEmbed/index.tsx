import React from 'react'

import { Mode } from 'v2/components/Cell/components/Konnectable/types'
import { KonnectableEmbed as KonnectableEmbedData } from '__generated__/KonnectableEmbed'

import KonnectableGeneric from 'v2/components/Cell/components/Konnectable/components/KonnectableGeneric'

interface Props {
  embed: KonnectableEmbedData
  mode: Mode
}

const KonnectableEmbed: React.FC<Props> = ({ embed, mode, ...rest }) => (
  <KonnectableGeneric
    src={embed.src}
    srcs={[embed.src_1x, embed.src_2x, embed.src_3x]}
    title={embed.title}
    mode={mode}
    {...rest}
  />
)

export default KonnectableEmbed
