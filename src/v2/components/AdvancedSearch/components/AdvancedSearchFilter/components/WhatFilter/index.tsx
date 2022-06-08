import React from 'react'
import {
  FilterContainer,
  FilterProps,
  CategoryLabel,
} from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter'
import { FilterOption } from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter/components/FilterOption'
import { WhatEnum } from '__generated__/globalTypes'

export const WhatFilter: React.FC<FilterProps> = ({
  currentFilters,
  toggleFilter,
  clearAndSetAll,
}) => {
  const updateProps = {
    field: 'what' as any,
    toggleFilter,
  }
  return (
    <FilterContainer>
      <CategoryLabel>What</CategoryLabel>
      <FilterOption
        currentFilters={currentFilters}
        filter={WhatEnum.ALL}
        {...updateProps}
        toggleFilter={clearAndSetAll}
      />
      <FilterOption
        currentFilters={currentFilters}
        filter={WhatEnum.BLOCK}
        {...updateProps}
      />
      <FilterOption
        currentFilters={currentFilters}
        filter={WhatEnum.CHANNEL}
        {...updateProps}
      />
      <FilterOption
        currentFilters={currentFilters}
        filter={WhatEnum.USER}
        {...updateProps}
      />
      <FilterOption
        currentFilters={currentFilters}
        filter={WhatEnum.GROUP}
        {...updateProps}
      />
    </FilterContainer>
  )
}
