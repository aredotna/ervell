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
import useSerializedMe from 'v2/hooks/useSerializedMe'

interface RangeOptionProps {
  label: string
  before?: string
  after?: string
  currentRange?: {
    before?: string
    after?: string
  }
  active?: boolean
  disabled?: boolean
}

const RangeOption: React.FC<RangeOptionProps> = ({
  label,
  currentRange,
  active,
  before,
  after,
  disabled,
}) => {
  const { setRange } = useContext(AdvancedSearchContext)

  const onClick = useCallback(() => {
    setRange(before, after)
  }, [setRange, before, after])

  const isSelected =
    (currentRange?.before === before && currentRange?.after === after) || active

  return (
    <Container disabled={disabled} active={isSelected} onClick={onClick}>
      <FilterLabel disabled={disabled} active={isSelected}>
        {label}
      </FilterLabel>
    </Container>
  )
}

export const TimeRange: React.FC = () => {
  const { state } = useContext(AdvancedSearchContext)
  const { is_premium } = useSerializedMe()

  const currentRange = {
    before: state.variables?.before,
    after: state.variables?.after,
  }

  const defaultSelected = !currentRange.before && !currentRange.after
  const now = DateTime.now().plus({ days: 1 })
  const disabled = !is_premium

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
        disabled={disabled}
      />

      <RangeOption
        label="Past week"
        currentRange={currentRange}
        before={now.toISODate()}
        after={now.minus({ weeks: 1 }).toISODate()}
        disabled={disabled}
      />

      <RangeOption
        label="Past month"
        currentRange={currentRange}
        before={now.toISODate()}
        after={now.minus({ months: 1 }).toISODate()}
        disabled={disabled}
      />

      <RangeOption
        label="Past year"
        currentRange={currentRange}
        before={now.toISODate()}
        after={now.minus({ years: 1 }).toISODate()}
        disabled={disabled}
      />
    </FilterContainer>
  )
}
