import React, { useCallback, useState } from 'react'

import billingQuery from 'v2/components/Billing/queries/groupBilling'

import subscribeToPremiumForUsersMutation from 'v2/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupCheckout/mutations/subscribeToPremiumForUsers'

import Box from 'v2/components/UI/Box'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import Count from 'v2/components/UI/Count'
import GenericButton from 'v2/components/UI/GenericButton'
import { LabelledInput, Label } from 'v2/components/UI/Inputs'
import CouponCode from 'v2/components/Billing/components/CouponCode'
import CreditCard from 'v2/components/Billing/components/CreditCard'
import PlanChanges from 'v2/components/Billing/components/PlanChanges'
import StatusOverlay from 'v2/components/Billing/components/StatusOverlay'
import { MyGroupCheckout as MyGroupCheckoutType } from '__generated__/MyGroupCheckout'
import { UserSelection_users } from '__generated__/UserSelection'
import { SupportedPlanEnum } from '__generated__/globalTypes'
import { useMutation } from '@apollo/client'
import {
  SubscribeToPremiumForUsers,
  SubscribeToPremiumForUsersVariables,
} from '__generated__/SubscribeToPremiumForUsers'

interface MyGroupCheckoutProps {
  me: MyGroupCheckoutType
  group: {
    __typename: 'Group' | 'Customer'
    id: string | number
  }
  selectedPlan: SupportedPlanEnum | 'basic'
  upgradeableUsers: UserSelection_users[]
  onSubscribed: () => void
  onError: (err: any) => void
}

export const MyGroupCheckout: React.FC<MyGroupCheckoutProps> = ({
  upgradeableUsers,
  selectedPlan,
  me,
  group,
  onSubscribed,
  onError,
}) => {
  const customer = me?.customer

  const [mode, setMode] = useState<'resting' | 'processing'>('resting')
  const [couponCode, setCouponCode] = useState<string | null>(null)

  const handleCouponCode = useCallback(code => setCouponCode(code), [])
  const handleTotalChange = () => {}

  const [subscribeToPremiumForUsers] = useMutation<
    SubscribeToPremiumForUsers,
    SubscribeToPremiumForUsersVariables
  >(subscribeToPremiumForUsersMutation)

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()

      setMode('processing')

      const user_ids = upgradeableUsers.map(({ id }) => id.toString())

      return subscribeToPremiumForUsers({
        variables: {
          group_id: group.id.toString(),
          user_ids,
          token: customer.default_credit_card.id,
          plan_id: selectedPlan.toUpperCase() as SupportedPlanEnum,
          coupon_code: couponCode,
        },
        refetchQueries: [{ query: billingQuery }],
        awaitRefetchQueries: true,
      })
        .then(() => {
          setMode('resting')
          setCouponCode(null)

          return onSubscribed()
        })
        .catch(err => {
          setMode('resting')

          return onError(err)
        })
    },
    [customer, selectedPlan]
  )

  return (
    <Box>
      {mode === 'processing' && (
        <StatusOverlay>
          <LoadingIndicator f={9} />
        </StatusOverlay>
      )}

      {selectedPlan !== 'basic' && (
        <form onSubmit={handleSubmit}>
          <LabelledInput>
            <Label>Billed to</Label>

            <CreditCard customer={customer} />
          </LabelledInput>

          <LabelledInput>
            <Label>Coupon</Label>

            <CouponCode
              key={`coupon_${mode}`}
              onDebouncedCode={handleCouponCode}
              code={couponCode}
            />
          </LabelledInput>

          {upgradeableUsers.length > 0 && (
            <LabelledInput>
              <Label />

              <PlanChanges
                entity={group}
                planId={selectedPlan}
                couponCode={couponCode}
                quantity={upgradeableUsers.length}
                handleTotalChange={handleTotalChange}
              />
            </LabelledInput>
          )}

          <LabelledInput>
            <Label />

            <div>
              <GenericButton
                onClick={handleSubmit}
                disabled={
                  upgradeableUsers.length === 0 || !customer.default_credit_card
                }
              >
                {upgradeableUsers.length > 0 ? (
                  <span>
                    Activate{' '}
                    <Count
                      amount={upgradeableUsers.length}
                      label="Premium subscription"
                    />
                  </span>
                ) : (
                  'Activate'
                )}
              </GenericButton>
            </div>
          </LabelledInput>
        </form>
      )}
    </Box>
  )
}

export default MyGroupCheckout
