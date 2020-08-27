import React from 'react'

import { Mode } from 'v2/components/Cell/components/Konnectable/types'
import { KonnectableLink as KonnectableLinkData } from '__generated__/KonnectableLink'

import KonnectableGeneric from 'v2/components/Cell/components/Konnectable/components/KonnectableGeneric'

interface Props {
  link: KonnectableLinkData
  mode: Mode
}

export const KonnectableLink: React.FC<Props> = ({ link, mode, ...rest }) => (
  <KonnectableGeneric
    src={link.src}
    srcs={[link.src_1x, link.src_2x, link.src_3x]}
    title={link.title}
    borderColor="gray.hint"
    mode={mode}
    {...rest}
  />
)

export default KonnectableLink
