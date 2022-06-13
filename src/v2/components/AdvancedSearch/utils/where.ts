import { WhatEnum } from '__generated__/globalTypes'
import { EnumLabelMap } from './labels'

const blockFilters = [
  WhatEnum.IMAGE,
  WhatEnum.LINK,
  WhatEnum.MEDIA,
  WhatEnum.TEXT,
  WhatEnum.BLOCK,
  WhatEnum.ATTACHMENT,
]

export const hasBlockFilters = (currentFilters?: WhatEnum[]) => {
  return currentFilters?.some(filter => blockFilters.includes(filter))
}

export const currentBlockFilters = (currentFilters?: WhatEnum[]) => {
  return currentFilters?.filter(filter => {
    return blockFilters.includes(filter)
  })
}

export const currentBlockFilterLabels = (currentFilters?: WhatEnum[]) => {
  return currentBlockFilters(currentFilters)
    ?.map(filter => {
      return EnumLabelMap[filter]
    })
    .join(', ')
}
