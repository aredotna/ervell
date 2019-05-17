import React from 'react'

import { KonnectableLink as KonnectableLinkData } from '__generated__/KonnectableLink'

import KonnectableGeneric from 'v2/components/Cell/components/Konnectable/components/KonnectableGeneric'

interface Props {
  link: KonnectableLinkData
}

export const KonnectableLink: React.FC<Props> = ({ link, ...rest }) => (
  <KonnectableGeneric
    src={link.src}
    title={link.title}
    borderColor="gray.hint"
    {...rest}
  />
)

export default KonnectableLink
