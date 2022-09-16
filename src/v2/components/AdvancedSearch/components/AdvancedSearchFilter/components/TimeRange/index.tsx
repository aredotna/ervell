import React, { useCallback, useContext } from 'react'
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
        before="now"
        after="1d"
      />

      <RangeOption
        label="Past week"
        currentRange={currentRange}
        before="now"
        after="1w"
      />

      <RangeOption
        label="Past month"
        currentRange={currentRange}
        before="now"
        after="1m"
      />

      <RangeOption
        label="Past year"
        currentRange={currentRange}
        before="now"
        after="1y"
      />
    </FilterContainer>
  )
}
