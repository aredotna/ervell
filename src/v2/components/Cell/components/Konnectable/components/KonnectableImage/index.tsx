import React from 'react'

import { KonnectableImage as KonnectableImageData } from '__generated__/KonnectableImage'

import KonnectableGeneric from 'v2/components/Cell/components/Konnectable/components/KonnectableGeneric'

interface Props {
  image: KonnectableImageData
}

export const KonnectableImage: React.FC<Props> = ({ image, ...rest }) => (
  <KonnectableGeneric src={image.src} title={image.title} {...rest} />
)

export default KonnectableImage
