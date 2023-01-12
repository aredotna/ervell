import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import {
  StripeAddressElementChangeEvent,
  StripeCardElementChangeEvent,
} from '@stripe/stripe-js'
import {
  useElements,
  useStripe,
  AddressElement,
  CardElement,
} from '@stripe/react-stripe-js'

import StripeElementsContext from 'v2/components/StripeElementsContext'
import Box from 'v2/components/UI/Box'
import GenericButton from 'v2/components/UI/GenericButton'
import Text from 'v2/components/UI/Text'
import useSerializedMe from 'v2/hooks/useSerializedMe'

import { OrderSummary } from './components/OrderSummary'
import { PlanPulldown } from './components/PlanPulldown'

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

const Container = styled(Box).attrs({
  display: 'flex',
  flexDirection: 'row',
})`
  height: 100%;
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

  const [country, setCountry] = useState<string>('')
  const [postalCode, setPostalCode] = useState<string>('')
  const [planIdState, setPlanIdState] = useState<SupportedPlanEnum>(
    planId as SupportedPlanEnum
  )

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

    setupIncompleteSubscription({
      variables: {
        plan_id: planIdState,
      },
    }).then(({ data }) => {
      const subscriptionId =
        data?.setup_incomplete_subscription?.subscription?.id
      const clientSecret = data?.setup_incomplete_subscription?.client_secret

      if (!subscriptionId) {
        return false
      }

      const return_url = `${window.location.origin}/settings/refresh_subscription?subscription_id=${subscriptionId}`

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
          console.log({ error, paymentIntent })

          if (error) {
            console.log({ error })
            return
          }

          if (paymentIntent) {
            window.location.href = return_url
          }
        })
    })
  }, [stripe, elements, country, postalCode, planId])

  const handleAddressChange = useCallback(
    (event: StripeAddressElementChangeEvent) => {
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
        setCountry(event.value.address.country)
        setPostalCode(event.value.address.postal_code)
      })
    },
    [setCountry, setPostalCode]
  )

  const handleCardChange = useCallback(
    (event: StripeCardElementChangeEvent) => {
      console.log({ event })
    },
    []
  )

  if (!stripe || !elements) {
    return <div>loading...</div>
  }

  return (
    <Box p={7} height="100%">
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
                defaultValues: {
                  name: user.name,
                },
              }}
              onChange={handleAddressChange}
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
          <OrderSummary
            planId={planIdState}
            country={country}
            postalCode={postalCode}
          />

          <GenericButton
            display="block"
            onClick={handleSubmit}
            f={3}
            bg="state.premium"
            color="white"
          >
            Upgrade to Premium
          </GenericButton>
        </InvoiceContainer>
      </Container>
    </Box>
  )
}
