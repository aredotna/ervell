import sharify from 'sharify'
import React from 'react'
import { useTheme } from 'styled-components'

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
  const theme = useTheme()

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        fontFamily: 'Arial, sans-serif',
        fontSizeBase: '14px',
        boxShadow: 'none',
        colorText: theme.colors.gray.bold,
        colorBackground: theme.colors.background,
      },
      rules: {
        '.Label': {
          fontSize: '12px',
        },
        '.Input': {
          boxShadow: 'none',
          border: `1px solid ${theme.colors.gray.semiLight}`,
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
