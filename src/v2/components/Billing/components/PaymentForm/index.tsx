import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useMutation, useQuery } from '@apollo/client'
import sharify from 'sharify'
import {
  StripeAddressElementChangeEvent,
  StripeCardElementChangeEvent,
} from '@stripe/stripe-js'
import {
  useElements,
  useStripe,
  CardElement,
  AddressElement,
} from '@stripe/react-stripe-js'

import StripeElementsContext from 'v2/components/StripeElementsContext'
import Box from 'v2/components/UI/Box'
import GenericButton from 'v2/components/UI/GenericButton'
import Text from 'v2/components/UI/Text'

import { OrderSummary } from './components/OrderSummary'
import { PlanPulldown } from './components/PlanPulldown'
import CouponCode from 'v2/components/Billing/components/CouponCode'

import updateAddressMutation from './mutations/updateAddressMutation'
import setupIncompleteSubscriptionMutation from './mutations/setupIncompleteSubscription'

import {
  SetupIncompleteSubscription,
  SetupIncompleteSubscriptionVariables,
} from '__generated__/SetupIncompleteSubscription'
import {
  UpdateAddressMutation,
  UpdateAddressMutationVariables,
} from '__generated__/UpdateAddressMutation'
import { SupportedPlanEnum } from '__generated__/globalTypes'
import { isEmpty } from 'lodash'
import customerAddress from './queries/customerAddress'
import { CustomerAddress } from '__generated__/CustomerAddress'
import useSerializedMe from 'v2/hooks/useSerializedMe'

const {
  data: { GOOGLE_MAPS_API_KEY },
} = sharify

const Container = styled(Box).attrs({
  display: 'flex',
  flexDirection: 'row',
  p: 7,
})`
  height: 100%;
  position: relative;
`

const StatusContainer = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${x => x.theme.colors.utility.translucent};
  z-index: 1;
  align-items: center;
  justify-content: center;

  display: ${x => (x.display ? 'flex' : 'none')};
  flex-direction: column;
`

const PaymentContainer = styled(Box).attrs({
  width: '70%',
  pr: 7,
  mr: 7,
  borderRight: '1px solid',
  borderColor: 'gray.light',
})``

const InvoiceContainer = styled(Box).attrs({
  width: '30%',
})``

interface PaymentFormProps {
  clientSecret?: string
  planId: string
  subscriptionId?: string
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  clientSecret,
  planId,
  subscriptionId,
}) => {
  return (
    <StripeElementsContext clientSecret={clientSecret}>
      <PaymentFormInner
        planId={planId}
        clientSecret={clientSecret}
        subscriptionId={subscriptionId}
      />
    </StripeElementsContext>
  )
}

const PaymentFormInner: React.FC<PaymentFormProps> = ({ planId }) => {
  const stripe = useStripe()
  const elements = useElements()
  const user = useSerializedMe()

  const [mode, setMode] = useState<
    'resting' | 'initializing' | 'confirming' | 'redirecting' | 'error'
  >('resting')
  const retry = useCallback(() => setMode('resting'), [])

  const [errorMessage, setErrorMessage] = useState<string>('')
  const [inlineErrorMessage, setInlineErrorMessage] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [postalCode, setPostalCode] = useState<string>('')
  const [isAddressComplete, setIsAddressComplete] = useState<boolean>(false)
  const [couponCode, setCouponCode] = useState<string | null>(null)
  const [planIdState, setPlanIdState] = useState<SupportedPlanEnum>(
    planId as SupportedPlanEnum
  )

  const { data, loading } = useQuery<CustomerAddress>(customerAddress)

  const [updateAddress] = useMutation<
    UpdateAddressMutation,
    UpdateAddressMutationVariables
  >(updateAddressMutation)
  const [setupIncompleteSubscription] = useMutation<
    SetupIncompleteSubscription,
    SetupIncompleteSubscriptionVariables
  >(setupIncompleteSubscriptionMutation)

  const handleSubmit = useCallback(async () => {
    if (!stripe || !elements) {
      return
    }

    setMode('initializing')

    setupIncompleteSubscription({
      variables: {
        plan_id: planIdState,
        coupon_code: couponCode,
      },
    })
      .then(({ data, errors }) => {
        const subscriptionId =
          data?.setup_incomplete_subscription?.subscription?.id
        const clientSecret = data?.setup_incomplete_subscription?.client_secret

        if (!subscriptionId) {
          setMode('error')
          setErrorMessage(
            errors?.[0]?.message || 'Couldn’t create subscription'
          )
          return false
        }

        const return_url = `${window.location.origin}/settings/refresh_subscription?subscription_id=${subscriptionId}`
        setMode('confirming')

        stripe
          .confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                address: {
                  country,
                  postal_code: postalCode,
                },
              },
            },
          })
          .then(({ error, paymentIntent }) => {
            setMode('redirecting')

            if (error) {
              setMode('error')
              setErrorMessage(error.message)
              return
            }

            if (paymentIntent && paymentIntent.status === 'succeeded') {
              window.location.href = return_url
            }
          })
          .catch(error => {
            setMode('error')
            setErrorMessage(error.message)
          })
      })
      .catch(error => {
        setMode('error')
        setErrorMessage(error.message)
      })
  }, [
    stripe,
    elements,
    country,
    postalCode,
    planId,
    setMode,
    setErrorMessage,
    couponCode,
    setupIncompleteSubscription,
  ])

  const handleAddressBlur = useCallback(() => {
    if (isAddressComplete) {
      return
    }

    setInlineErrorMessage('Please enter a valid address')
  }, [isAddressComplete])

  const handleAddressChange = useCallback(
    (event: StripeAddressElementChangeEvent) => {
      if (
        !isEmpty(data?.me?.customer?.address.postal_code) &&
        !isEmpty(data?.me?.customer?.address.country)
      ) {
        setCountry(data.me.customer.address.country)
        setPostalCode(data.me.customer.address.postal_code)
        setIsAddressComplete(
          !isEmpty(data.me.customer.address.country) &&
            !isEmpty(data.me.customer.address.postal_code)
        )
        return
      }

      updateAddress({
        variables: {
          line1: event.value.address.line1,
          line2: event.value.address.line2,
          city: event.value.address.city,
          state: event.value.address.state,
          postal_code: event.value.address.postal_code,
          country: event.value.address.country,
        },
      }).then(() => {
        setIsAddressComplete(
          !isEmpty(event.value.address.country) &&
            !isEmpty(event.value.address.postal_code)
        )
        setCountry(event.value.address.country)
        setPostalCode(event.value.address.postal_code)
      })
    },
    [setCountry, setPostalCode, data]
  )

  const handleCardChange = useCallback(
    (event: StripeCardElementChangeEvent) => {
      setInlineErrorMessage(event.error?.message || '')
    },
    []
  )

  if (!stripe || !elements || loading) {
    return (
      <Container>
        <StatusContainer>
          <Text f={4}>Loading billing form...</Text>
        </StatusContainer>
      </Container>
    )
  }

  return (
    <Container>
      <PaymentContainer>
        <Box mb={7}>
          <Text f={4} fontWeight="bold" mb={7}>
            Upgrade to Premium
          </Text>
          <Text f={2} fontWeight="bold" mb={5}>
            Plan
          </Text>
          <PlanPulldown value={planIdState} onChange={setPlanIdState} />
        </Box>

        <Text f={2} fontWeight="bold" mb={7}>
          Billing information
        </Text>
        <Box mb={7}>
          <AddressElement
            options={{
              mode: 'billing',
              autocomplete: {
                mode: 'google_maps_api',
                apiKey: GOOGLE_MAPS_API_KEY,
              },
              defaultValues: {
                name: user.name,
                address: {
                  line1: data?.me?.customer?.address?.line1,
                  line2: data?.me?.customer?.address?.line2,
                  city: data?.me?.customer?.address?.city,
                  state: data?.me?.customer?.address?.state,
                  postal_code: data?.me?.customer?.address?.postal_code,
                  country: data?.me?.customer?.address?.country,
                },
              },
            }}
            onChange={handleAddressChange}
            onBlur={handleAddressBlur}
          />
        </Box>

        <Text f={2} fontWeight="bold" mb={6}>
          Payment information
        </Text>
        <Box
          border="1px solid"
          borderRadius="0.25em"
          borderColor="gray.light"
          p={4}
          mt={4}
        >
          <CardElement
            onChange={handleCardChange}
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: '14px',
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: 100,
                },
              },
            }}
          />
        </Box>
      </PaymentContainer>

      <InvoiceContainer>
        <Text f={4} fontWeight="bold">
          Order Summary
        </Text>
        <OrderSummary
          planId={planIdState}
          country={country}
          postalCode={postalCode}
          couponCode={couponCode}
        />

        <Box my={5}>
          <CouponCode onDebouncedCode={setCouponCode} />
        </Box>

        {inlineErrorMessage && (
          <Box my={5}>
            <Text f={2} color="state.alert" fontWeight="bold" mb={4}>
              {inlineErrorMessage}
            </Text>
          </Box>
        )}

        <GenericButton
          display="block"
          onClick={handleSubmit}
          f={3}
          bg="state.premium"
          color="white"
          disabled={!isAddressComplete || inlineErrorMessage}
        >
          Upgrade to Premium
        </GenericButton>
      </InvoiceContainer>

      <StatusContainer display={mode != 'resting'}>
        <Text f={6} mb={6} color="gray.bold">
          {
            {
              initializing: 'Thank you! Setting up your subscription...',
              confirming: 'Confirming your payment...',
              redirecting: 'Success! Redirecting you back...',
              error: 'Something went wrong. Please try again.',
            }[mode]
          }
        </Text>
        {mode == 'error' && (
          <>
            <Text f={5} fontWeight="bold" color="state.alert" mb={6}>
              {errorMessage}
            </Text>
            <GenericButton
              display="block"
              onClick={retry}
              f={3}
              bg="state.premium"
              color="white"
            >
              Retry
            </GenericButton>
          </>
        )}
      </StatusContainer>
    </Container>
  )
}
