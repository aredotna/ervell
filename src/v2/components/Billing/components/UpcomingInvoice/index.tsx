import { capitalize } from 'lodash'
import React from 'react'
import styled from 'styled-components'
import { MyPaymentMethodWrapper } from 'v2/components/MyPaymentMethod'

import Box from 'v2/components/UI/Box'
import Modal from 'v2/components/UI/Modal'
import Text from 'v2/components/UI/Text'
import { centsToDollarsAndCents } from 'v2/pages/about/PricingPage/components/PricingTable'
import { UpcomingInvoice as Customer } from '__generated__/UpcomingInvoice'

const Link = styled(Text).attrs({
  f: 2,
  color: 'state.premium',
  fontWeight: 'bold',
})`
  cursor: pointer;
  display: inline-block;
`

interface UpcomingInvoiceProps {
  customer: Customer
}

export const UpcomingInvoice: React.FC<UpcomingInvoiceProps> = props => {
  const {
    customer: { upcoming_invoice },
    customer,
    ...rest
  } = props

  const openCreditCardModal = () => {
    const modal = new Modal(
      MyPaymentMethodWrapper,
      {
        onDone: () => {
          console.log('ttrying to close')
          modal.close()
        },
      },
      {}
    )
    modal.open()
  }

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
          <strong>Next payment due:</strong>{' '}
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
          <>
            <Text f={2}>
              <strong>Card on file:</strong>{' '}
              {capitalize(customer.default_payment_method?.card?.brand)} ****
              **** **** {customer.default_payment_method.card.last4} (expires{' '}
              {customer.default_payment_method.card.exp_month}/
              {customer.default_payment_method.card.exp_year}){' '}
              <Link onClick={openCreditCardModal}>Update card</Link>
            </Text>
          </>
        )}
    </Box>
  )
}

export default UpcomingInvoice
