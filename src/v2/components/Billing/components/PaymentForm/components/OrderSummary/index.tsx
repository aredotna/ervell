import { useQuery } from '@apollo/client'
import { throttle } from 'lodash'
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
})``

const Value = styled(Text).attrs({
  f: 1,
})``

interface OrderSummaryProps {
  planId: SupportedPlanEnum
  country: string
  postalCode: string
  couponCode?: string
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  planId,
  country,
  postalCode,
  couponCode,
}) => {
  const { data, refetch } = useQuery<OrderSummaryType, OrderSummaryVariables>(
    orderSummaryQuery,
    {
      variables: {
        plan_id: planId,
        coupon_code: couponCode,
      },
    }
  )

  useEffect(() => {
    throttle(() => {
      refetch({ plan_id: planId })
    }, 100)
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
  const taxLabel = data?.me?.customer?.upcoming_invoice?.tax
    ? `Tax (${data.me.customer.upcoming_invoice.tax_rate.jurisdiction} ${data?.me?.customer?.upcoming_invoice?.tax_rate.percentage}%)`
    : 'Tax'

  const discount = data?.me?.customer?.upcoming_invoice?.discount
  const discountDescription = discount?.coupon.description

  return (
    <Box>
      <Invoice>
        <LineItem>
          <Label>Subtotal</Label>
          <Value>{subtotalValue}</Value>
        </LineItem>
        <LineItem>
          <Label>{taxLabel}</Label>
          <Value>{taxValue}</Value>
        </LineItem>
        {discount && (
          <LineItem>
            <Label color="state.premium">Discount</Label>
            <Value color="state.premium">{discountDescription}</Value>
          </LineItem>
        )}
        <LineItem>
          <Label fontWeight="bold">Total</Label>
          <Value fontWeight="bold">{totalValue}</Value>
        </LineItem>
      </Invoice>
    </Box>
  )
}
