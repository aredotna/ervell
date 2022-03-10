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
    srcs={[image.src_1x, image.src_2x, image.src_3x]}
    title={image.title}
    alt_text={image.alt_text}
    mode={mode}
    originalDimensions={image.original_dimensions}
    {...rest}
  />
)

export default KonnectableImage
