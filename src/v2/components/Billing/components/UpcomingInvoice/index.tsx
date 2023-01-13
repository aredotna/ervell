import { capitalize } from 'lodash'
import React from 'react'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { centsToDollarsAndCents } from 'v2/pages/about/PricingPage/components/PricingTable'
import { UpcomingInvoice as Customer } from '__generated__/UpcomingInvoice'

interface UpcomingInvoiceProps {
  customer: Customer
}

export const UpcomingInvoice: React.FC<UpcomingInvoiceProps> = props => {
  const {
    customer: { upcoming_invoice },
    customer,
    ...rest
  } = props

  if (
    // You don't have an invoice coming up
    !upcoming_invoice ||
    // Or your next invoice is actually a refund
    upcoming_invoice.total <= 0 ||
    // Or you're on a free plan
    customer.status === 'inactive'
  )
    return null

  return (
    <Box pr={8} {...rest}>
      <Text f={2}>
        <>
          Next payment due:{' '}
          {upcoming_invoice.subtotal <= upcoming_invoice.total ? (
            `${centsToDollarsAndCents(upcoming_invoice.total)}`
          ) : (
            <span>
              <del>{`${centsToDollarsAndCents(
                upcoming_invoice.subtotal
              )}`}</del>
              {` ${centsToDollarsAndCents(upcoming_invoice.total)}`}
            </span>
          )}
          {upcoming_invoice.next_payment_attempt_at &&
            ` on ${upcoming_invoice.next_payment_attempt_at}`}
        </>
      </Text>

      {customer.default_payment_method &&
        customer.default_payment_method?.card && (
          <Text f={2}>
            Card on file:{' '}
            {capitalize(customer.default_payment_method?.card?.brand)} **** ****
            **** {customer.default_payment_method.card.last4}
          </Text>
        )}

      {/* {currentDate < pricingChangeDate && (
        <Text f={2} color="state.premium" underlineLinks>
          <a href="https://www.are.na/blog/on-pricing">
            Read about upcoming changes to premium plans on January 15th, 2023{' '}
          </a>
        </Text>
      )} */}
    </Box>
  )
}

export default UpcomingInvoice
