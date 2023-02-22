import { useQuery } from '@apollo/client'
import { throttle } from 'lodash'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { centsToDollarsAndCents } from 'v2/pages/about/PricingPage/components/PricingTable'
import { SupportedPlanEnum } from '__generated__/globalTypes'
import {
  GroupOrderSummary as GroupOrderSummaryType,
  GroupOrderSummaryVariables,
} from '__generated__/GroupOrderSummary'
import {
  OrderSummary as OrderSummaryType,
  OrderSummaryVariables,
} from '__generated__/OrderSummary'
import groupOrderSummaryQuery from './queries/groupOrderSummaryQuery'
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
  groupId?: string
  quantity?: number
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  groupId,
  ...rest
}) => {
  if (groupId) {
    return <GroupOrderSummary groupId={groupId} {...rest} />
  }

  return <IndividualOrderSummary {...rest} />
}

export const GroupOrderSummary: React.FC<OrderSummaryProps> = ({
  groupId,
  quantity,
  planId,
  couponCode,
}) => {
  const { data, refetch } = useQuery<
    GroupOrderSummaryType,
    GroupOrderSummaryVariables
  >(groupOrderSummaryQuery, {
    variables: {
      group_id: groupId,
      quantity: quantity,
      plan_id: planId,
      coupon_code: couponCode,
    },
  })

  useEffect(() => {
    throttle(() => {
      refetch({ group_id: groupId, quantity: quantity, plan_id: planId })
    }, 100)
  }, [groupId, quantity, planId, couponCode])

  const subtotalValue = data?.group?.invoice?.subtotal
    ? centsToDollarsAndCents(data?.group?.invoice?.subtotal)
    : '–'

  const taxValue = data?.group?.invoice?.tax
    ? centsToDollarsAndCents(data?.group?.invoice?.tax)
    : '–'

  const totalValue = data?.group?.invoice?.total
    ? centsToDollarsAndCents(data?.group?.invoice?.total)
    : '–'

  const taxLabel = data?.group?.invoice?.tax
    ? `Tax (${data.group.invoice.tax_rate.jurisdiction} ${data?.group?.invoice?.tax_rate.percentage}%)`
    : 'Tax'

  const discount = data?.group?.invoice?.discount
  const discountDescription = discount?.coupon.description

  return (
    <OrderSummaryDisplay
      subtotalValue={subtotalValue}
      taxValue={taxValue}
      totalValue={totalValue}
      taxLabel={taxLabel}
      discount={discount}
      discountDescription={discountDescription}
      planId={planId}
      quantity={quantity}
    />
  )
}

export const IndividualOrderSummary: React.FC<OrderSummaryProps> = ({
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
    <OrderSummaryDisplay
      subtotalValue={subtotalValue}
      taxValue={taxValue}
      totalValue={totalValue}
      taxLabel={taxLabel}
      discount={discount}
      discountDescription={discountDescription}
      planId={planId}
    />
  )
}

interface OrderSummaryDisplayProps {
  subtotalValue: string
  taxValue: string
  totalValue: string
  taxLabel: string
  discount?: any
  discountDescription?: string
  planId: SupportedPlanEnum
  quantity?: number
}

const OrderSummaryDisplay: React.FC<OrderSummaryDisplayProps> = ({
  subtotalValue,
  taxValue,
  totalValue,
  taxLabel,
  discount,
  discountDescription,
  planId,
  quantity = 1,
}) => {
  const planLabel = {
    [SupportedPlanEnum.MONTHLY]: 'Monthly',
    [SupportedPlanEnum.YEARLY]: 'Yearly',
    [SupportedPlanEnum.PLUS_YEARLY]: 'Supporter',
  }[planId]

  const basePrice = {
    [SupportedPlanEnum.MONTHLY]: '$7',
    [SupportedPlanEnum.YEARLY]: '$70',
    [SupportedPlanEnum.PLUS_YEARLY]: '$120',
  }[planId]

  return (
    <Box>
      <Invoice>
        <LineItem>
          <Label>
            {planLabel} ({basePrice} x {quantity})
          </Label>
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
