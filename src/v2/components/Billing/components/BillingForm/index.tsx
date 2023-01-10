import React, { FormEvent, useCallback } from 'react'
import { injectStripe } from 'react-stripe-elements'
import { useMutation } from '@apollo/client'
import axios from 'axios'

import mapErrors from 'v2/util/mapErrors'
import Modal from 'v2/components/UI/Modal'

import billingQuery from 'v2/components/Billing/queries/billing'

import subscribeToPremiumWithOptionalTokenMutation from 'v2/components/Billing/components/BillingForm/mutations/subscribeToPremiumWithOptionalToken'
import cancelPremiumSubscriptionMutation from 'v2/components/Billing/components/BillingForm/mutations/cancelPremiumSubscription'
import downgradeToLifetimeSubscriptionMutation from 'v2/components/Billing/components/BillingForm/mutations/downgradeToLifetimeSubscription'
import setupIncompleteSubscriptionMutation from './mutations/setupIncompleteSubscription'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Alert from 'v2/components/UI/Alert'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import GenericButton from 'v2/components/UI/GenericButton'
import Icons from 'v2/components/UI/Icons'
import PlanSelection from 'v2/components/Billing/components/PlanSelection'
import CancellationNotice from 'v2/components/Billing/components/CancellationNotice'
import CancelPremium from 'v2/components/Billing/components/CancelPremium'
import StatusOverlay from 'v2/components/Billing/components/StatusOverlay'

import useMergeState from 'v2/hooks/useMergeState'

import { CancelPremiumSubscription as CancelPremiumSubscriptionType } from '__generated__/CancelPremiumSubscription'
import { DowngradeToLifetime } from '__generated__/DowngradeToLifetime'
import { Billing as Me } from '__generated__/Billing'
import { SupportedPlanEnum } from '__generated__/globalTypes'
import {
  SubscribeToPremiumWithOptionalToken,
  SubscribeToPremiumWithOptionalTokenVariables,
} from '__generated__/SubscribeToPremiumWithOptionalToken'
import { PaymentForm } from '../PaymentForm'
import {
  SetupIncompleteSubscription,
  SetupIncompleteSubscriptionVariables,
} from '__generated__/SetupIncompleteSubscription'

type OperationsEnum =
  | 'CHANGE_PLAN_ID'
  | 'CANCEL_PREMIUM_SUBSCRIPTION'
  | 'DOWNGRADE_TO_LIFETIME'
  | 'APPLY_COUPON_CODE'
  | 'RESUBSCRIBE'

interface BillingFormProps {
  me: Me
  onSuccess?: any
  plan_id?: string
}

interface BillingFormState {
  mode?:
    | 'resting'
    | 'error'
    | 'processing'
    | 'canceled'
    | 'subscribed'
    | 'card_changed'
  operations?: OperationsEnum[]
  planId?: SupportedPlanEnum | 'basic' | 'lifetime'
  couponCode?: string
  errorMessage?: string
  total?: number
}

const BillingForm: React.FC<BillingFormProps> = ({
  plan_id,
  me,
  onSuccess,
}) => {
  const { customer } = me

  const [state, setState] = useMergeState<BillingFormState>({
    mode: 'resting',
    operations: [],
  })

  const { operations, mode, errorMessage, couponCode, total } = state

  const [subscribeToPremiumWithOptionalToken] = useMutation<
    SubscribeToPremiumWithOptionalToken,
    SubscribeToPremiumWithOptionalTokenVariables
  >(subscribeToPremiumWithOptionalTokenMutation)
  const [cancelPremiumSubscription] = useMutation<
    CancelPremiumSubscriptionType
  >(cancelPremiumSubscriptionMutation)
  const [downgradeToLifetimeSubscription] = useMutation<DowngradeToLifetime>(
    downgradeToLifetimeSubscriptionMutation
  )

  const [setupIncompleteSubscription] = useMutation<
    SetupIncompleteSubscription,
    SetupIncompleteSubscriptionVariables
  >(setupIncompleteSubscriptionMutation)

  const planId = state.planId || customer.plan?.id

  const fromPlanToPlan = `${customer?.plan?.id}:${planId}`
  const customerCanSubmit = operations.length > 0 || total === 0

  const doWeNeedTo = useCallback(
    (operationName: OperationsEnum) => {
      return operations.includes(operationName)
    },
    [operations]
  )

  const addOperation = useCallback(
    (operationName: OperationsEnum) => {
      const set = new Set([...operations, operationName])
      const updatedOperations = Array.from(set)
      return updatedOperations
    },
    [operations]
  )

  const removeOperation = useCallback(
    operationName => {
      const set = new Set(operations)
      set.delete(operationName)
      return Array.from(set)
    },
    [operations]
  )

  const handleErrors = useCallback(
    err => {
      setState({
        mode: 'error',
        ...mapErrors(err),
      })
    },
    [setState]
  )

  const resolveWithMode = useCallback(
    mode => {
      setState({
        mode,
        couponCode: '',
        errorMessage: null,
        operations: [],
      })

      setTimeout(() => setState({ mode: 'resting' }), 10000)
    },
    [setState]
  )

  const handleSubscribeToPremium = useCallback(() => {
    if (!customer.default_payment_method && total !== 0) {
      return Promise.reject(new Error('Please add a credit card to continue'))
    }

    if (planId === 'basic' || planId === 'lifetime') {
      return Promise.reject('Not a valid plan id')
    }

    const plan_id = planId.toUpperCase() as SupportedPlanEnum

    const defaultVariables = {
      coupon_code: couponCode,
      plan_id,
    }

    const variables =
      total === 0
        ? defaultVariables
        : {
            ...defaultVariables,
            token: customer.default_credit_card?.id,
          }

    return subscribeToPremiumWithOptionalToken({
      variables,
      refetchQueries: [{ query: billingQuery }],
      awaitRefetchQueries: true,
    })
      .then(() => {
        return axios.get('/me/refresh')
      })
      .then(() => {
        window.location.reload()
      })
  }, [
    customer.default_credit_card,
    total,
    planId,
    couponCode,
    subscribeToPremiumWithOptionalToken,
  ])

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const plan_id = planId.toUpperCase() as SupportedPlanEnum

      if (doWeNeedTo('CHANGE_PLAN_ID') && !fromPlanToPlan.includes('basic')) {
        return handleSubscribeToPremium()
          .then(() => {
            resolveWithMode('subscribed')
          })
          .catch(handleErrors)
      }

      setupIncompleteSubscription({ variables: { plan_id } }).then(response => {
        const clientSecret =
          response.data.setup_incomplete_subscription.client_secret
        const subscriptionId =
          response.data.setup_incomplete_subscription.subscription.id
        const componentProps = {
          planId,
          subscriptionId,
          clientSecret,
          onClose: () => setState({ mode: 'resting' }),
        }
        const modalProps = { width: '70%', maxWidth: '60em' }
        const modal = new Modal(PaymentForm, componentProps, modalProps)
        modal.open()
      })

      setState({ mode: 'processing' })
    },
    [
      doWeNeedTo,
      downgradeToLifetimeSubscription,
      handleErrors,
      onSuccess,
      resolveWithMode,
      setState,
      fromPlanToPlan,
      planId,
      handleSubscribeToPremium,
      setupIncompleteSubscription,
    ]
  )

  const handleDowngradePremium = useCallback(
    e => {
      setState({ operations: addOperation('DOWNGRADE_TO_LIFETIME') })
      handleSubmit(e)
    },
    [handleSubmit, addOperation, setState]
  )

  const handleCancelPremium = useCallback(() => {
    setState({ mode: 'processing' })
    return cancelPremiumSubscription()
      .then(() => resolveWithMode('canceled'))
      .catch(handleErrors)
  }, [handleSubmit, addOperation, setState])

  const handleReenable = useCallback(() => {
    if (customer.is_beneficiary) {
      return setState({
        mode: 'error',
        errorMessage: 'Contact your group administrator',
      })
    }

    setState({
      planId: customer.plan.id as SupportedPlanEnum,
      operations: addOperation('RESUBSCRIBE'),
      mode: 'processing',
    })
    handleSubscribeToPremium()
  }, [addOperation, handleSubmit, customer, setState])

  const handlePlan = useCallback(
    plan_id => {
      if (plan_id === customer.plan.id) {
        return setState({
          planId: plan_id,
          operations: removeOperation('CHANGE_PLAN_ID'),
        })
      }

      return setState({
        planId: plan_id,
        operations: addOperation('CHANGE_PLAN_ID'),
      })
    },
    [addOperation, removeOperation, setState, customer]
  )

  return (
    <Box mb={10}>
      {mode === 'processing' && (
        <StatusOverlay>
          <LoadingIndicator f={9} />
        </StatusOverlay>
      )}

      {mode === 'subscribed' && (
        <Alert mb={6} bg="state.premium" color="white" isCloseable={false}>
          Subscribed! You’re all set!
        </Alert>
      )}

      {mode === 'card_changed' && (
        <Alert mb={6} bg="state.neutral" isCloseable={false}>
          Billing details updated! You’re all set!
        </Alert>
      )}

      {mode === 'error' && (
        <ErrorAlert mb={6} isReloadable={false}>
          {errorMessage}
        </ErrorAlert>
      )}

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection={['column', 'column', 'row']}>
          <Box
            flex="1"
            borderBottom="1px solid"
            borderColor="gray.semiLight"
            pb={6}
            mr={[0, 0, 6]}
          >
            <Box
              borderBottom="1px solid"
              borderColor="gray.semiLight"
              pb={6}
              mb={6}
            >
              <Text f={4} fontWeight="bold">
                Plan type
              </Text>
            </Box>

            {customer.is_canceled && !customer.is_lifetime && (
              <CancellationNotice
                my={6}
                customer={customer}
                onReenable={handleReenable}
              />
            )}

            <PlanSelection
              key={plan_id + customer.is_canceled}
              me={me}
              onSelect={handlePlan}
              plan_id={plan_id}
            />

            {customer.is_beneficiary && (
              <React.Fragment>
                <Box bg="gray.hint" p={6} mb={6} borderRadius="0.25em">
                  <Text>
                    {customer.patron.name} ({customer.patron.hidden_email})
                  </Text>
                </Box>

                <Text f={1} mx={6}>
                  {customer.patron.name} is upgrading you to{' '}
                  {customer.plan.term} Premium
                  <br />
                  {customer.is_canceled
                    ? `Subscription ends on ${customer.current_period_end_at}`
                    : `Automatically renews on ${customer.current_period_end_at}`}
                </Text>
              </React.Fragment>
            )}
          </Box>
        </Box>

        {!customer.is_canceled &&
          !customer.is_beneficiary &&
          fromPlanToPlan !== 'plus_yearly:lifetime' &&
          fromPlanToPlan !== 'basic:basic' && (
            <Box width="100%" textAlign="center" mt={8}>
              <GenericButton
                display="block"
                f={4}
                onClick={handleSubmit}
                disabled={!customerCanSubmit}
              >
                <Icons name="CreditCard" size="1rem" mr={4} color="gray.bold" />

                {{
                  'basic:monthly': 'Enter payment details',
                  'basic:yearly': 'Enter payment details',
                  'monthly:yearly': 'Update subscription',
                  'yearly:monthly': 'Update subscription',
                  'monthly:plus_yearly': 'Upgrade subscription',
                  'yearly:plus_yearly': 'Upgrade subscription',
                  'monthly:basic': 'Cancel Premium',
                  'yearly:basic': 'Cancel Premium',
                  'basic:plus_yearly': 'Enter payment details',
                }[fromPlanToPlan] || 'Save changes'}
              </GenericButton>

              {plan_id !== 'basic' && customer.plan?.id !== 'basic' && (
                <CancelPremium my={6} onCancel={handleCancelPremium} />
              )}
            </Box>
          )}

        {fromPlanToPlan === 'plus_yearly:lifetime' && (
          <Box width="100%" textAlign="center" mt={8}>
            <GenericButton
              display="block"
              f={4}
              onClick={handleDowngradePremium}
              disabled={
                !customer.default_credit_card || operations.length === 0
              }
            >
              Downgrade to Lifetime
            </GenericButton>
          </Box>
        )}
      </form>
    </Box>
  )
}

export default injectStripe(BillingForm)
