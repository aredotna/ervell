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
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  )
}

export default StripeElementsContext
