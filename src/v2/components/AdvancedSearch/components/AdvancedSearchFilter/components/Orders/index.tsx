import React, { useCallback, useContext } from 'react'
import {
  AdvancedSearchContext,
  AnyFilter,
} from 'v2/components/AdvancedSearch/AdvancedSearchContext'
import {
  FilterContainer,
  CategoryLabel,
} from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter'
import {
  FilterLabel,
  FilterContainer as Container,
} from 'v2/components/AdvancedSearch/components/AdvancedSearchFilter/components/FilterOption'
import { Order, SortDirection, SortOrderEnum } from '__generated__/globalTypes'

interface OrderOptionProps {
  facet: SortOrderEnum
  dir: SortDirection
  label: string
  currentOrder?: Order
  disabledFilters: AnyFilter[]
}

const OrderOption: React.FC<OrderOptionProps> = ({
  facet,
  dir,
  label,
  currentOrder,
  disabledFilters,
}) => {
  const { setOrder } = useContext(AdvancedSearchContext)
  const isSelected = facet === currentOrder?.facet && dir === currentOrder?.dir
  const isDisabled = disabledFilters.includes(facet)

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

  return (
    <FilterContainer>
      <CategoryLabel>Order</CategoryLabel>
      <OrderOption
        facet={SortOrderEnum.NAME}
        dir={SortDirection.ASC}
        label="Default"
        currentOrder={currentOrder}
        disabledFilters={disabledFilters}
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
