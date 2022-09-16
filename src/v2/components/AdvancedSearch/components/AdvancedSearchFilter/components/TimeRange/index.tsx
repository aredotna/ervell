import React, { useCallback, useContext } from 'react'
import { DateTime } from 'luxon'

import { AdvancedSearchContext } from 'v2/components/AdvancedSearch/AdvancedSearchContext'
import {
  FilterContainer,
  CategoryLabel,
} from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter'
import {
  FilterLabel,
  FilterContainer as Container,
} from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter/components/FilterOption'

interface RangeOptionProps {
  label: string
  before?: string
  after?: string
  currentRange?: {
    before?: string
    after?: string
  }
  active?: boolean
}

const RangeOption: React.FC<RangeOptionProps> = ({
  label,
  currentRange,
  active,
  before,
  after,
}) => {
  const { setRange } = useContext(AdvancedSearchContext)

  const onClick = useCallback(() => {
    setRange(before, after)
  }, [setRange, before, after])

  const isSelected =
    (currentRange?.before === before && currentRange?.after === after) || active

  return (
    <Container active={isSelected} onClick={onClick}>
      <FilterLabel active={isSelected}>{label}</FilterLabel>
    </Container>
  )
}

export const TimeRange: React.FC = () => {
  const { state } = useContext(AdvancedSearchContext)

  const currentRange = {
    before: state.variables?.before,
    after: state.variables?.after,
  }

  const defaultSelected = !currentRange.before && !currentRange.after
  const now = DateTime.now().plus({ days: 1 })

  return (
    <FilterContainer>
      <CategoryLabel>Time</CategoryLabel>
      <RangeOption
        label="All time"
        currentRange={currentRange}
        active={defaultSelected}
      />

      <RangeOption
        label="Past day"
        currentRange={currentRange}
        before={now.toISODate()}
        after={now.minus({ hours: 24 }).toISODate()}
      />

      <RangeOption
        label="Past week"
        currentRange={currentRange}
        before={now.toISODate()}
        after={now.minus({ weeks: 1 }).toISODate()}
      />

      <RangeOption
        label="Past month"
        currentRange={currentRange}
        before={now.toISODate()}
        after={now.minus({ months: 1 }).toISODate()}
      />

      <RangeOption
        label="Past year"
        currentRange={currentRange}
        before={now.toISODate()}
        after={now.minus({ years: 1 }).toISODate()}
      />
    </FilterContainer>
  )
}
