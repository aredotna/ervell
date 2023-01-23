import { useMutation } from '@apollo/client'
import { capitalize } from 'lodash'
import React from 'react'
import styled from 'styled-components'
import { MyBillingAddressWrapper } from 'v2/components/MyBillingAddress'
import { MyPaymentMethodWrapper } from 'v2/components/MyPaymentMethod'

import Box from 'v2/components/UI/Box'
import Modal from 'v2/components/UI/Modal'
import Text from 'v2/components/UI/Text'
import { centsToDollarsAndCents } from 'v2/pages/about/PricingPage/components/PricingTable'
import { CreateCustomerPortalSession } from '__generated__/CreateCustomerPortalSession'
import { UpcomingInvoice as Customer } from '__generated__/UpcomingInvoice'
import createCustomerPortalSession from './mutations/createCustomerPortalSession'

const Link = styled(Text).attrs({
  f: 2,
  color: 'gray.semiBold',
  fontWeight: 'bold',
})`
  cursor: pointer;
  display: inline-block;

  &:hover {
    color: ${x => x.theme.colors.gray.bold};
  }
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

  const [createPortalSession] = useMutation<CreateCustomerPortalSession>(
    createCustomerPortalSession
  )

  const handlePortalLink = async () => {
    const { data } = await createPortalSession()

    if (data) {
      window.location.href = data.create_portal_session.url
    }
  }

  const openCreditCardModal = () => {
    const modal = new Modal(
      MyPaymentMethodWrapper,
      {
        onDone: () => {
          modal.close()
        },
      },
      {}
    )
    modal.open()
  }

  const openBillingAddressModal = () => {
    const modal = new Modal(
      MyBillingAddressWrapper,
      {
        onDone: () => {
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
            ` on ${upcoming_invoice.next_payment_attempt_at}`}{' '}
          —{' '}
          <Link onClick={handlePortalLink} mt={6}>
            View invoices
          </Link>
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
              {customer.default_payment_method.card.exp_year}) —{' '}
              <Link onClick={openCreditCardModal}>Update default card</Link>
            </Text>
          </>
        )}

      {customer.address?.country && customer?.address.postal_code && (
        <Text f={2}>
          <strong>Billing address:</strong> {customer.address.line1}{' '}
          {customer.address.line2} {customer.address.city}{' '}
          {customer.address.state} {customer.address.postal_code}{' '}
          {customer.address.country} —{' '}
          <Link onClick={openBillingAddressModal}>Update address</Link>
        </Text>
      )}
    </Box>
  )
}

export default UpcomingInvoice
