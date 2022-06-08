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
import { Order, SortDirection, SortOrder } from '__generated__/globalTypes'

interface OrderOptionProps {
  facet: SortOrder
  dir: SortDirection
  label: string
  currentOrder?: Order
}

const OrderOption: React.FC<OrderOptionProps> = ({
  facet,
  dir,
  label,
  currentOrder,
}) => {
  const { setOrder } = useContext(AdvancedSearchContext)
  const isSelected = facet === currentOrder?.facet && dir === currentOrder?.dir

  const onClick = useCallback(() => {
    setOrder(facet, dir)
  }, [currentOrder, setOrder])

  return (
    <Container active={isSelected} onClick={onClick}>
      <FilterLabel active={isSelected}>{label}</FilterLabel>
    </Container>
  )
}

export const Orders: React.FC = () => {
  const { state } = useContext(AdvancedSearchContext)

  const currentOrder = state.variables?.order

  return (
    <FilterContainer>
      <CategoryLabel>Order</CategoryLabel>
      <OrderOption
        facet={SortOrder.NAME}
        dir={SortDirection.ASC}
        label="Default"
        currentOrder={currentOrder}
      />

      <OrderOption
        label="Updated recently"
        facet={SortOrder.UPDATED_AT}
        dir={SortDirection.DESC}
        currentOrder={currentOrder}
      />

      <OrderOption
        label="Newest first"
        facet={SortOrder.CREATED_AT}
        dir={SortDirection.DESC}
        currentOrder={currentOrder}
      />

      <OrderOption
        label="Oldest first"
        facet={SortOrder.CREATED_AT}
        dir={SortDirection.ASC}
        currentOrder={currentOrder}
      />

      <OrderOption
        label="No. of connections"
        facet={SortOrder.CONNECTIONS_COUNT}
        dir={SortDirection.DESC}
        currentOrder={currentOrder}
      />

      <OrderOption
        label="Random"
        facet={SortOrder.RANDOM}
        dir={SortDirection.ASC}
        currentOrder={currentOrder}
      />
    </FilterContainer>
  )
}
