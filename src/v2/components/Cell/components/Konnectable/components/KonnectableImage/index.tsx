import React from 'react'
import { useWebPSupportCheck } from 'react-use-webp-support-check'

import { Mode } from 'v2/components/Cell/components/Konnectable/types'
import { KonnectableImage as KonnectableImageData } from '__generated__/KonnectableImage'

import KonnectableGeneric from 'v2/components/Cell/components/Konnectable/components/KonnectableGeneric'

interface Props {
  image: KonnectableImageData
  mode: Mode
}

export const KonnectableImage: React.FC<Props> = ({ image, mode, ...rest }) => {
  const supportsWebP = useWebPSupportCheck()
  const srcs = supportsWebP ? [image.src_1x, image.src_2x, image.src_3x] : []

  return (
    <KonnectableGeneric
      src={image.src}
      srcs={srcs}
      title={image.title}
      mode={mode}
      {...rest}
    />
  )
}

export default KonnectableImage
