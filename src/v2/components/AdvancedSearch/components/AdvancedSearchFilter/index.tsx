import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import {
  DisabledFilters,
  getCurrentFilter,
} from 'v2/components/AdvancedSearch/utils/filters'
import Box from 'v2/components/UI/Box'
import {
  Copy,
  Message,
  QuestionMarkOverlay,
} from 'v2/components/UI/QuestionMarkOverlay'
import Text from 'v2/components/UI/Text'
import useSerializedMe from 'v2/hooks/useSerializedMe'

import { FieldsEnum, WhatEnum, WhereEnum } from '__generated__/globalTypes'
import { AdvancedSearchContext } from '../../AdvancedSearchContext'
import { FieldsFilter } from './components/FieldsFilter'
import { Orders } from './components/Orders'
import { TimeRange } from './components/TimeRange'
import { WhatFilter } from './components/WhatFilter'
import { WhereFilter } from './components/WhereFilter'

import constants from 'v2/styles/constants'

const FiltersContainer = styled(Box).attrs({
  display: 'flex',
  flexDirection: 'row',
})`
  flex-wrap: wrap;

  ${constants.media.small`
  width: 100vw;
`}
`

export const FilterContainer = styled(Box).attrs({
  mt: 5,
  pr: 5,
})`
  width: 10em;
`

export const CategoryLabel = styled(Text).attrs({
  f: 0,
  color: 'gray.medium',
  mb: 4,
})`
  text-transform: uppercase;
`

export interface FilterProps {
  currentFilters?: WhereEnum[] | WhatEnum[] | FieldsEnum[]
  currentDisabledFilters?: DisabledFilters
  id?: number
  toggleFilter: (
    filter: WhereEnum | WhatEnum | FieldsEnum,
    field: 'what' | 'where' | 'fields'
  ) => void
  clearAndSetAll: (
    filter: WhereEnum | WhatEnum | FieldsEnum,
    field: 'what' | 'where' | 'fields'
  ) => void
}

interface AdvancedSearchFilterProps {
  onToggleFilter?: (
    filter?: WhereEnum | WhatEnum | FieldsEnum,
    field?: 'what' | 'where' | 'fields'
  ) => void
}

export const AdvancedSearchFilter: React.FC<AdvancedSearchFilterProps> = ({
  onToggleFilter,
}) => {
  const { is_premium } = useSerializedMe()

  const { state, addFilter, removeFilter, setAllFilter } = useContext(
    AdvancedSearchContext
  )
  const toggleFilter = useCallback(
    (
      filter: WhereEnum | WhatEnum | FieldsEnum,
      field: 'what' | 'where' | 'fields'
    ) => {
      const currentFilter = getCurrentFilter(field, state.variables)

      currentFilter == filter
        ? removeFilter(field, filter)
        : addFilter(field, filter)

      if (onToggleFilter) {
        onToggleFilter(filter, field)
      }
    },
    [state, state.variables, addFilter, removeFilter, onToggleFilter]
  )

  const toggleAll = useCallback(
    (
      filter: WhereEnum | WhatEnum | FieldsEnum,
      field: 'what' | 'where' | 'fields'
    ) => {
      const currentFilter = getCurrentFilter(field, state.variables)
      currentFilter == WhereEnum.ALL
        ? removeFilter(field, filter)
        : setAllFilter(field)
    },
    [state, state.variables, addFilter, removeFilter]
  )

  const where = (state?.variables?.where && state?.variables?.where[0]) || null
  const id = where?.id

  return (
    <Box>
      {!is_premium && (
        <Box mb={4}>
          <QuestionMarkOverlay
            label={'About search filters'}
            labelColor="state.premium"
            iconColor="state.premium"
            iconHoverColor="state.premium"
          >
            <Message>
              <Copy>
                Advanced search filters are detailed search options which can be
                combined to give you fine-grained control over your search
                results.
                <br />
                <br />
                To use these filters, you must be a premium member.
              </Copy>
            </Message>
          </QuestionMarkOverlay>
        </Box>
      )}
      <FiltersContainer>
        <WhereFilter
          id={id || null}
          clearAndSetAll={toggleAll}
          toggleFilter={toggleFilter}
          currentFilter={where?.facet}
          currentDisabledFilters={state.disabledFilters}
        />
        <WhatFilter
          clearAndSetAll={toggleAll}
          toggleFilter={toggleFilter}
          currentFilters={state.variables?.what?.facets}
          currentDisabledFilters={state.disabledFilters}
        />
        <FieldsFilter
          clearAndSetAll={toggleAll}
          toggleFilter={toggleFilter}
          currentFilters={state.variables?.fields?.facets}
          currentDisabledFilters={state.disabledFilters}
        />
        <Orders />
        <TimeRange />
      </FiltersContainer>
    </Box>
  )
}

export default AdvancedSearchFilter
