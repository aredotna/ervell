import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { centsToDollarsAndCents } from 'v2/pages/about/PricingPage/components/PricingTable'
import { SupportedPlanEnum } from '__generated__/globalTypes'
import {
  OrderSummary as OrderSummaryType,
  OrderSummaryVariables,
} from '__generated__/OrderSummary'
import orderSummaryQuery from './queries/orderSummaryQuery'

const Invoice = styled(Box).attrs({
  py: 6,
})``

const LineItem = styled(Box).attrs({})`
  display: flex;
  justify-content: space-between;
`

const Label = styled(Text).attrs({
  f: 1,
  fontWeight: 'bold',
})``

const Value = styled(Text).attrs({
  f: 1,
  fontWeight: 'bold',
})``

interface OrderSummaryProps {
  planId: SupportedPlanEnum
  country: string
  postalCode: string
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  planId,
  country,
  postalCode,
}) => {
  const { data, refetch } = useQuery<OrderSummaryType, OrderSummaryVariables>(
    orderSummaryQuery,
    {
      variables: {
        plan_id: planId,
      },
    }
  )

  useEffect(() => {
    console.log('refetching', country, postalCode, planId)
    refetch({ plan_id: planId })
  }, [country, postalCode, planId])

  const subtotalValue = data?.me?.customer?.upcoming_invoice?.subtotal
    ? centsToDollarsAndCents(data?.me?.customer?.upcoming_invoice?.subtotal)
    : '–'
  const taxValue = data?.me?.customer?.upcoming_invoice?.tax
    ? centsToDollarsAndCents(data?.me?.customer?.upcoming_invoice?.tax)
    : '–'
  const totalValue = data?.me?.customer?.upcoming_invoice?.total
    ? centsToDollarsAndCents(data?.me?.customer?.upcoming_invoice?.total)
    : '–'
  const taxLabel = data?.me?.customer?.upcoming_invoice?.tax_rate?.percentage
    ? `Tax (${data.me.customer.upcoming_invoice.tax_rate.jurisdiction} ${data?.me?.customer?.upcoming_invoice?.tax_rate.percentage}%)`
    : 'Tax'

  return (
    <Box>
      <Text f={3} fontWeight="bold">
        Order Summary
      </Text>
      <Invoice>
        <LineItem>
          <Label>Subtotal</Label>
          <Value>{subtotalValue}</Value>
        </LineItem>
        <LineItem>
          <Label>{taxLabel}</Label>
          <Value>{taxValue}</Value>
        </LineItem>
        <LineItem>
          <Label>Total</Label>
          <Value>{totalValue}</Value>
        </LineItem>
      </Invoice>
    </Box>
  )
}
