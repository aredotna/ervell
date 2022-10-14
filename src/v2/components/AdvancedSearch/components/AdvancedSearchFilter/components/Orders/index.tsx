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
import {
  currentFilterIsDisabled,
  DisabledFilters,
} from 'v2/components/AdvancedSearch/utils/filters'
import { Order, SortDirection, SortOrderEnum } from '__generated__/globalTypes'

interface OrderOptionProps {
  facet: SortOrderEnum
  dir: SortDirection
  label: string
  currentOrder?: Order
  disabledFilters: DisabledFilters
  active?: boolean
}

const OrderOption: React.FC<OrderOptionProps> = ({
  facet,
  dir,
  label,
  currentOrder,
  disabledFilters,
  active,
}) => {
  const { setOrder } = useContext(AdvancedSearchContext)
  const isSelected =
    active || (facet === currentOrder?.facet && dir === currentOrder?.dir)
  const isDisabled = currentFilterIsDisabled('order', facet, disabledFilters)

  const onClick = useCallback(() => {
    setOrder(facet, dir)
  }, [currentOrder, setOrder])

  return (
    <Container disabled={isDisabled} active={isSelected} onClick={onClick}>
      <FilterLabel disabled={isDisabled} active={isSelected}>
        {label}
      </FilterLabel>
    </Container>
  )
}

export const Orders: React.FC = () => {
  const { state } = useContext(AdvancedSearchContext)

  const currentOrder = state.variables?.order
  const disabledFilters = state.disabledFilters
  const defaultSelected =
    !currentOrder || currentOrder.facet === SortOrderEnum.SCORE

  return (
    <FilterContainer>
      <CategoryLabel>Order</CategoryLabel>
      <OrderOption
        facet={SortOrderEnum.SCORE}
        dir={SortDirection.ASC}
        label="Default"
        currentOrder={currentOrder}
        disabledFilters={disabledFilters}
        active={defaultSelected}
      />

      <OrderOption
        label="Updated recently"
        facet={SortOrderEnum.UPDATED_AT}
        dir={SortDirection.DESC}
        currentOrder={currentOrder}
        disabledFilters={disabledFilters}
      />

      <OrderOption
        label="Newest first"
        facet={SortOrderEnum.CREATED_AT}
        dir={SortDirection.DESC}
        currentOrder={currentOrder}
        disabledFilters={disabledFilters}
      />

      <OrderOption
        label="Oldest first"
        facet={SortOrderEnum.CREATED_AT}
        dir={SortDirection.ASC}
        currentOrder={currentOrder}
        disabledFilters={disabledFilters}
      />

      <OrderOption
        label="Alphabetical by title"
        facet={SortOrderEnum.NAME}
        dir={SortDirection.ASC}
        currentOrder={currentOrder}
        disabledFilters={disabledFilters}
      />

      <OrderOption
        label="No. of connections"
        facet={SortOrderEnum.CONNECTIONS_COUNT}
        dir={SortDirection.DESC}
        currentOrder={currentOrder}
        disabledFilters={disabledFilters}
      />

      <OrderOption
        label="Random"
        facet={SortOrderEnum.RANDOM}
        dir={SortDirection.ASC}
        currentOrder={currentOrder}
        disabledFilters={disabledFilters}
      />
    </FilterContainer>
  )
}
