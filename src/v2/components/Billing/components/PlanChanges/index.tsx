import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import customerPlanChangesQuery from 'v2/components/Billing/components/PlanChanges/queries/customerPlanChanges'
import groupPlanChangesQuery from 'v2/components/Billing/components/PlanChanges/queries/groupPlanChanges'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import { SupportedPlanEnum } from '__generated__/globalTypes'

interface PlanChangesProps {
  couponCode?: string
  quantity?: number
  planId: SupportedPlanEnum | 'basic' | 'lifetime'
  handleTotalChange: (total: number) => void
  entity: {
    __typename: 'Group' | 'Customer'
    id: string | number
  }
}

const PlanChanges: React.FC<PlanChangesProps> = ({
  quantity = 0,
  entity,
  planId,
  couponCode,
  handleTotalChange,
  ...rest
}) => {
  const [total, setTotal] = useState<number | null>(null)

  const variables = {
    plan_id: planId?.toUpperCase(),
    coupon_code: couponCode,
    quantity,
    group_id: null,
  }

  if (entity.__typename === 'Group') {
    variables.group_id = entity.id
  }

  const query =
    entity.__typename === 'Group'
      ? groupPlanChangesQuery
      : customerPlanChangesQuery

  const { data, loading, error } = useQuery(query, { variables })

  useEffect(() => {
    // invoice.total
    const invoice =
      entity.__typename === 'Group'
        ? data?.group.invoice
        : data?.me.customer.invoice

    console.log({ data, total, invoice })

    if (invoice && invoice.total !== total) {
      setTotal(invoice.total)
      handleTotalChange(invoice.total)
    }
  }, [total, data, entity, handleTotalChange])

  if (!planId) {
    return null
  }

  if (loading) {
    return (
      <Box position="relative" {...rest}>
        <LoadingIndicator
          f={2}
          justifyContent="start"
          frames={['$', '$$', '$$$']}
        />
      </Box>
    )
  }

  if (error) {
    return (
      <Box position="relative" {...rest}>
        <ErrorAlert>{error.message}</ErrorAlert>
      </Box>
    )
  }

  const invoice =
    entity.__typename === 'Group'
      ? data.group.invoice
      : data.me.customer.invoice

  return (
    <Box position="relative" {...rest}>
      <Text f={2}>
        {invoice.total >= 0
          ? `You will be charged $${(invoice.total / 100).toFixed(2)} ${
              invoice.next_payment_attempt_at
                ? `on ${invoice.next_payment_attempt_at}`
                : ''
            }`
          : `Your account will be credited $${Math.abs(
              invoice.total / 100
            ).toFixed(2)}`}
      </Text>
    </Box>
  )
}

export default PlanChanges
