import React, { useCallback } from 'react'
import styled from 'styled-components'
import {
  useElements,
  useStripe,
  PaymentElement,
  AddressElement,
} from '@stripe/react-stripe-js'
import {
  StripeAddressElementChangeEvent,
  StripePaymentElementChangeEvent,
} from '@stripe/stripe-js'

import StripeElementsContext from 'v2/components/StripeElementsContext'
import Box from 'v2/components/UI/Box'
import GenericButton from 'v2/components/UI/GenericButton'
import Text from 'v2/components/UI/Text'
import useSerializedMe from 'v2/hooks/useSerializedMe'

const Container = styled(Box).attrs({
  display: 'flex',
  flexDirection: 'row',
})``

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
  clientSecret: string
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

const PaymentFormInner: React.FC<PaymentFormProps> = ({ subscriptionId }) => {
  const stripe = useStripe()
  const elements = useElements()
  const user = useSerializedMe()

  const handleSubmit = useCallback(async () => {
    if (!stripe || !elements) {
      return
    }

    const return_url = `${window.location.origin}/settings/refresh_subscription?subscription_id=${subscriptionId}`

    await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url,
      },
    })
  }, [stripe, elements])

  const handleCardChange = useCallback(
    (event: StripePaymentElementChangeEvent) => {
      console.log({
        event,
        elements,
      })
    },
    [elements]
  )

  const handleAddressChange = useCallback(
    (event: StripeAddressElementChangeEvent) => {
      console.log({ event })
    },
    []
  )

  if (!stripe || !elements) {
    return <div>loading...</div>
  }

  return (
    <Box p={7}>
      <Container>
        <PaymentContainer>
          <Text f={4} fontWeight="bold" mb={8}>
            Upgrade to Premium
          </Text>
          <Text f={2} fontWeight="bold" mb={5}>
            Billing info
          </Text>
          <PaymentElement
            onChange={handleCardChange}
            onBlur={handleCardChange}
          />
          <AddressElement
            options={{
              mode: 'billing',
              defaultValues: {
                name: user.name,
              },
            }}
            onChange={handleAddressChange}
          />
        </PaymentContainer>

        <InvoiceContainer>
          <Text f={2} fontWeight="bold">
            Order Summary
          </Text>
        </InvoiceContainer>
      </Container>

      <Box width="100%" textAlign="center" mt={8}>
        <GenericButton display="block" onClick={handleSubmit} f={4}>
          Upgrade
        </GenericButton>
      </Box>
    </Box>
  )
}
