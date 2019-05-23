import React from 'react'

import { Mode } from 'v2/components/Cell/components/Konnectable/types'
import { KonnectableImage as KonnectableImageData } from '__generated__/KonnectableImage'

import KonnectableGeneric from 'v2/components/Cell/components/Konnectable/components/KonnectableGeneric'

interface Props {
  image: KonnectableImageData
  mode: Mode
}

export const KonnectableImage: React.FC<Props> = ({ image, mode, ...rest }) => (
  <KonnectableGeneric
    src={image.src}
    title={image.title}
    mode={mode}
    {...rest}
  />
)

export default KonnectableImage
