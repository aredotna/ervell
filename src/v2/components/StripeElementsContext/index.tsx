import sharify from 'sharify'
import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const {
  data: { STRIPE_PUBLISHABLE_KEY },
} = sharify

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

interface StripeElementsContextProps {
  clientSecret?: string
}

const StripeElementsContext: React.FC<StripeElementsContextProps> = ({
  children,
  clientSecret,
}) => {
  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        fontFamily: 'Arial, sans-serif',
        fontSizeBase: '14px',
        boxShadow: 'none',
      },
      rules: {
        '.Label': {
          fontSize: '12px',
        },
        '.Input': {
          boxShadow: 'none',
          border: '1px solid #e5e5e5',
          borderRadius: '0.25em',
        },
      },
    },
  } as any

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  )
}

export default StripeElementsContext
