import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import {
  FilterContainer,
  FilterProps,
  CategoryLabel,
} from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter'
import {
  FilterOption,
  FilterLabel,
  FilterContainer as FilterOptionContainer,
  EnumLabelMap,
} from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter/components/FilterOption'
import Box from 'v2/components/UI/Box'
import { WhatEnum } from '__generated__/globalTypes'

const BlockMenuContainer = styled(Box)`
  position: relative;
  background-color: ${props => props.theme.colors.gray.hint};
  padding: ${props => props.theme.space[1]};
`

const BlockOptionContainer = styled(Box)``

const BlockOption = styled(FilterOption)`
  padding-left: ${props => props.theme.space[4]};
`

const Close = styled.a.attrs({
  role: 'button',
})`
  position: absolute;
  top: ${props => props.theme.space[1]};
  right: ${props => props.theme.space[3]};
  text-align: center;
  font-weight: bold;
  font-size: ${props => props.theme.fontSizesIndexed.xs};
  line-height: 1;
  border: 2px solid transparent;
  cursor: pointer;
  color: ${props => props.theme.colors.gray.regular};

  > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${props => props.theme.fontSizesIndexed.lg};
  }
`

const blockFilters = [
  WhatEnum.IMAGE,
  WhatEnum.LINK,
  WhatEnum.MEDIA,
  WhatEnum.TEXT,
  WhatEnum.BLOCK,
  WhatEnum.ATTACHMENT,
]

const hasBlockFilters = (currentFilters?: WhatEnum[]) => {
  return currentFilters?.some(filter => blockFilters.includes(filter))
}

const currentBlockFilters = (currentFilters?: WhatEnum[]) => {
  console.log({ currentFilters })
  return currentFilters?.filter(filter => {
    console.log('currentBlockFilters', { filter })
    return blockFilters.includes(filter)
  })
}

const currentBlockFilterLabels = (currentFilters?: WhatEnum[]) => {
  return currentBlockFilters(currentFilters)
    ?.map(filter => {
      console.log({ filter, 'EnumLabelMap[filter]': EnumLabelMap[filter] })
      return EnumLabelMap[filter]
    })
    .join(', ')
}

export const WhatFilter: React.FC<FilterProps> = ({
  currentFilters,
  toggleFilter,
  clearAndSetAll,
}) => {
  const updateProps = {
    field: 'what' as any,
    toggleFilter,
  }

  const [mode, setMode] = useState<'resting' | 'block'>('resting')

  const handleClose = useCallback(() => {
    setMode('resting')
  }, [setMode])

  const handleOpen = useCallback(() => {
    setMode('block')
  }, [setMode])

  if (mode === 'block') {
    return (
      <FilterContainer>
        <CategoryLabel>Types</CategoryLabel>
        <BlockMenuContainer>
          <Box>
            <FilterLabel>Blocks:</FilterLabel>
            <Close onClick={handleClose}>
              &nbsp;
              <span>&times;</span>
            </Close>
            <BlockOptionContainer>
              <BlockOption
                filter={WhatEnum.BLOCK}
                currentFilters={currentFilters}
                {...updateProps}
              />
              <BlockOption
                filter={WhatEnum.LINK}
                currentFilters={currentFilters}
                {...updateProps}
              />
              <BlockOption
                filter={WhatEnum.IMAGE}
                currentFilters={currentFilters}
                {...updateProps}
              />
              <BlockOption
                filter={WhatEnum.ATTACHMENT}
                currentFilters={currentFilters}
                {...updateProps}
              />
              <BlockOption
                filter={WhatEnum.TEXT}
                currentFilters={currentFilters}
                {...updateProps}
              />
              <BlockOption
                filter={WhatEnum.MEDIA}
                currentFilters={currentFilters}
                {...updateProps}
              />
            </BlockOptionContainer>
          </Box>
        </BlockMenuContainer>
      </FilterContainer>
    )
  }

  const blockFiltersActive = hasBlockFilters(currentFilters as WhatEnum[])
  const blockSubtypeLabels = currentBlockFilterLabels(
    currentFilters as WhatEnum[]
  )
  const blockLabel = blockFiltersActive
    ? `Blocks: ${blockSubtypeLabels}`
    : 'Blocks'

  return (
    <FilterContainer>
      <CategoryLabel>Types</CategoryLabel>
      <FilterOption
        currentFilters={currentFilters}
        filter={WhatEnum.ALL}
        {...updateProps}
        toggleFilter={clearAndSetAll}
      />
      <FilterOptionContainer onClick={handleOpen} active={blockFiltersActive}>
        <FilterLabel active={blockFiltersActive}>{blockLabel}</FilterLabel>
      </FilterOptionContainer>
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
