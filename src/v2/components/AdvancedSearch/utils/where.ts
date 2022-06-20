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

export const hasBlockFilters = (currentFilter?: WhatEnum) => {
  return blockFilters.includes(currentFilter)
}

export const currentBlockFilters = (currentFilter?: WhatEnum) => {
  return blockFilters.includes(currentFilter)
}

export const currentBlockFilterLabels = (currentFilter?: WhatEnum) => {
  return hasBlockFilters(currentFilter) ? EnumLabelMap[currentFilter] : ''
}
