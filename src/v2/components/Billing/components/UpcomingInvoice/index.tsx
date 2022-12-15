import React from 'react'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { UpcomingInvoice as Customer } from '__generated__/UpcomingInvoice'

interface UpcomingInvoiceProps {
  customer: Customer
}

export const UpcomingInvoice: React.FC<UpcomingInvoiceProps> = props => {
  const {
    customer: { upcoming_invoice },
    ...rest
  } = props

  if (
    // You don't have an invoice coming up
    !upcoming_invoice ||
    // Or your next invoice is actually a refund
    upcoming_invoice.total <= 0
  )
    return null

  // If the current date is before January 15th, 2023, show the pricing message
  const currentDate = new Date()
  const pricingChangeDate = new Date('2023-01-15')

  return (
    <Box {...rest}>
      <Text f={2}>
        <React.Fragment>
          Next payment due:{' '}
          {upcoming_invoice.subtotal === upcoming_invoice.total ? (
            `$${upcoming_invoice.total / 100.0}`
          ) : (
            <span>
              <del>{`$${upcoming_invoice.subtotal / 100.0}`}</del>
              {` $${upcoming_invoice.total / 100.0}`}
            </span>
          )}
          {upcoming_invoice.next_payment_attempt_at &&
            ` on ${upcoming_invoice.next_payment_attempt_at}`}
        </React.Fragment>
      </Text>
      {currentDate < pricingChangeDate && (
        <Text f={2} color="state.premium" underlineLinks>
          <a href="https://www.are.na/blog/on-pricing">
            Read about upcoming changes to premium plans on January 15th, 2023{' '}
          </a>
        </Text>
      )}
    </Box>
  )
}

export default UpcomingInvoice
